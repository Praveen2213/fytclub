const express = require('express');
const router = express.Router();
const pool = require('../db');


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