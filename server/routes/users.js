const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const {upload} = require('../cloudinary');
const authMiddleware = require('../middleware');
const wrapAsync = require('../utils/wrapAsync');
const { strictLimit } = require('../limiter');
const { validationResult } = require('express-validator');
const { validateEdit, validatePasswordChange } = require('../validator');

//leaderboard api
router.get('/leaderboard', wrapAsync(async(req, res)=>{
    const result = await pool.query(
        "SELECT users.username, users.total_wins, users.total_losses, COALESCE(SUM(battle_scores.score), 0) as total_points FROM users LEFT JOIN battle_scores ON users.id = battle_scores.user_id GROUP BY users.id ORDER BY total_points DESC"
    );
    res.status(200).json(result.rows);
    
}));

//search api
router.get('/search', authMiddleware, wrapAsync(async(req, res) => {
    const search = req.query.q;
    if(!search) {
        return res.status(400).json({ message: 'Search query required' });
    }
    const result = await pool.query(
        "SELECT id, username, avatar_url FROM users WHERE username ILIKE $1",
        [`%${search}%`]
    );
    res.status(200).json(result.rows);
}));

//profile image/avatar upload route
router.patch('/:id/avatar', authMiddleware, strictLimit, upload.single('avatar'), wrapAsync(async(req, res)=>{
    if(parseInt(req.params.id) !== parseInt(req.userId)){
        return res.status(403).json({message: "Unauthorized"});
    }

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const avatarURL = req.file.path;
    const userId = req.params.id;

    const result = await pool.query(
        'UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, username, avatar_url', [avatarURL, userId]
    );

    res.status(200).json(result.rows[0]);
}));

//password change 
router.patch('/:id/password', authMiddleware, validatePasswordChange, wrapAsync(async(req, res) => {
    if(parseInt(req.params.id) !== parseInt(req.userId)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { oldPassword, newPassword } = req.body;

    if(oldPassword === newPassword) {
        return res.status(400).json({ message: 'New password cannot be same as old password' });
    }

    const user = await pool.query(
        "SELECT password_hash FROM users WHERE id = $1", [req.params.id]
    );

    const isMatch = await bcrypt.compare(oldPassword, user.rows[0].password_hash);
    if(!isMatch) {
        return res.status(401).json({ message: 'Incorrect old password' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query(
        "UPDATE users SET password_hash = $1 WHERE id = $2", [hashedPassword, req.params.id]
    );

    res.status(200).json({ message: 'Password updated successfully' });
}));

//edit profile
router.patch('/:id/edit', authMiddleware, validateEdit, wrapAsync(async(req, res) => {
    if(parseInt(req.params.id) !== parseInt(req.userId)) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, email, bio } = req.body;
    
    const result = await pool.query(
        `UPDATE users SET 
         username = COALESCE($1, username),
         email = COALESCE($2, email),
         bio = COALESCE($3, bio)
         WHERE id = $4 
         RETURNING id, username, email, bio, avatar_url`,
        [username, email, bio, req.params.id]
    );
    
    res.status(200).json(result.rows[0]);
}));

//profile api
router.get('/:id', wrapAsync(async (req, res) =>{
    const id = req.params.id;

    const result = await pool.query(
        //'SELECT * FROM users WHERE id = $1', [id] => exposing hashed password
        "SELECT id, username, email, avatar_url, bio, total_wins, total_losses, created_at FROM users WHERE id = $1", [id]
    );
    
    if(result.rows.length === 0){
        return res.status(404).json({message : 'User not found'});
    }

    res.json(result.rows[0]);
}));

module.exports = router;