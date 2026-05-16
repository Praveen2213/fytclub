const express = require('express');
const router = express.Router();
const pool = require('../db');
const {upload} = require('../cloudinary');
const authMiddleware = require('../middleware');

//profile image/avatar upload route
router.patch('/:id/avatar', authMiddleware, upload.single('avatar'),async(req, res)=>{
    const avatarURL = req.file.path;
    const userId = req.params.id;

    const result = await pool.query(
        'UPDATE users SET avatar_url = $1 WHERE id = $2 RETURNING id, username, avatar_url', [avatarURL, userId]
    );

    res.status(200).json(result.rows[0]);
});

//leaderboard api
router.get('/leaderboard', async(req, res)=>{
    const result = await pool.query(
        "SELECT users.username, users.total_wins, users.total_losses, COALESCE(SUM(battle_scores.score), 0) as total_points FROM users LEFT JOIN battle_scores ON users.id = battle_scores.user_id GROUP BY users.id ORDER BY total_points DESC"
    );
    res.status(200).json(result.rows);
    
});

//prfile api
router.get('/:id', async (req, res) =>{
    const id = req.params.id;

    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1', [id]
    );
    
    if(result.rows.length === 0){
        return res.status(404).json({message : 'User not found'});
    }

    res.json(result.rows[0]);
});



module.exports = router;