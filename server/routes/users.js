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

//prfile api
router.get('/:id', async (req, res) =>{
    const id = req.params.id;

    const result = await pool.query(
        'SELECT * FROM users WHERE id = $1', [id]
    );
    
    if(result.rows.length === 0){
        res.status(404).json({message : 'User not found'});
    }

    res.json(result.rows[0]);
});



module.exports = router;