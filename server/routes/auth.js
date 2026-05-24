const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const wrapAsync = require('../utils/wrapAsync');
const {strictLimit} = require('../limiter');
const { validationResult } = require('express-validator');
const { validateRegister, validateLogin } = require('../validator');

router.post('/register', strictLimit, validateRegister, wrapAsync(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    
    const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',  [username, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
}));

router.post('/login', strictLimit, validateLogin, wrapAsync(async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;

    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );

    if(result.rows.length === 0){
        return res.status(401).json({message: 'Email not found'});
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if(!isMatch){
        return res.status(401).json({message: 'Incorrect Password'});
    }

    const token = jwt.sign(
        {userId: user.id},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );

    res.status(200).json({
        token,
        userId: user.id,
        username: user.username,
    });                
}));

module.exports = router;