const express = require('express');
const router = express.Router();
const pool = require('../db');
const authMiddleware = require('../middleware');
const crypto = require('crypto');
const wrapAsync = require('../utils/wrapAsync');
const { validateBattle, validateAccept } = require('../validator');
const { validationResult } = require('express-validator');

router.post('/', authMiddleware, validateBattle, wrapAsync(async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const invite_token = crypto.randomBytes(16).toString('hex');
    const { opponent_id, activity_types, challenger_dare} = req.body;
    const challenger_id = req.userId;

    //if user try to match with himself 
    if(parseInt(opponent_id) === parseInt(req.userId)) {
        return res.status(400).json({ message: 'You cannot battle yourself' });
    }

    //checking if opponent exist or not
    const opponent = await pool.query(
        "SELECT id FROM users WHERE id = $1", [opponent_id]
    );

    if(opponent.rows.length === 0){
        return res.status(400).json({message: "opponent not found"});
    }
    //one user -> one battle 
    const activeBattle = await pool.query(
    `SELECT id FROM battles 
     WHERE (challenger_id = $1 OR opponent_id = $1) 
     AND status IN ('pending', 'active')`,
     [req.userId]
    );

    if(activeBattle.rows.length > 0){
        return res.status(400).json({ message: 'You already have an active battle' });
    }
    
    const result = await pool.query(
        'INSERT INTO battles (challenger_id, opponent_id, activity_types, challenger_dare, invite_token) VALUES ($1, $2, $3, $4, $5) RETURNING id, challenger_id, opponent_id, activity_types, challenger_dare, invite_token, status, created_at',[challenger_id, opponent_id, activity_types, challenger_dare, invite_token]
    );

    res.status(201).json(result.rows[0]);
    
})); 

router.get('/accept/:token', wrapAsync(async(req, res) => {
    const token = req.params.token;

    const result = await pool.query(
        'SELECT * FROM battles WHERE invite_token = $1', [token]
    );

    if(result.rows.length === 0){
        return res.status(404).json({message : 'battle not found'});
    }

    res.status(201).json(result.rows[0]);
}));

router.patch('/:id/accept', authMiddleware, validateAccept, wrapAsync(async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const battle_id = req.params.id;
    const opponent_dare = req.body.opponent_dare;

    const battle = await pool.query(
        "SELECT * FROM battles WHERE id = $1", [battle_id]
    );

    if(!battle.rows[0]){
        return res.status(404).json({message: "Battle not found"});
    }
    //opponent verification 
    if(parseInt(battle.rows[0].opponent_id) !== parseInt(req.userId)){
        const name = await pool.query(
            "SELECT username FROM users WHERE id = $1", [battle.rows[0].opponent_id]
        );
        return res.status(403).json({message: `Only ${name.rows[0].username} can accept this battle`})
    }
    
    if(battle.rows[0].status !== 'pending'){
        return res.status(400).json({ message: 'Battle already accepted or completed' });
    }

    const result = await pool.query(
        "UPDATE battles SET status = $1, opponent_dare = $2, start_date = NOW(), end_date = NOW() + INTERVAL '7 days' WHERE id = $3 RETURNING *", ['active', opponent_dare, battle_id]
    );

    await pool.query(
        "INSERT INTO battle_scores (battle_id, user_id, score) VALUES ($1, $2, 0), ($1, $3, 0)", [battle_id, result.rows[0].challenger_id, result.rows[0].opponent_id]
    );

    res.status(200).json(result.rows[0]);
}));

router.patch('/:id/decline', authMiddleware, wrapAsync(async(req, res)=>{
    const battle_id = req.params.id;

    const battle = await pool.query(
        "SELECT * FROM battles WHERE id = $1", [battle_id]
    );

    if(!battle.rows[0]){
        return res.status(404).json({message: "Battle not found"});
    }
    //opponent verification 
    if(parseInt(battle.rows[0].opponent_id) !== parseInt(req.userId)){
        const name = await pool.query(
            "SELECT username FROM users WHERE id = $1", [battle.rows[0].opponent_id]
        );
        return res.status(403).json({message: `Only ${name.rows[0].username} can decline this battle`})
    }
    const result = await pool.query(
        "UPDATE battles SET status = $1 WHERE id = $2 RETURNING *", ['decline', battle_id]
    );

    res.status(200).json(result.rows[0]);
}));

router.get('/history/:userId', authMiddleware, wrapAsync(async(req, res)=>{
    const user = req.params.userId;
    if(parseInt(user) !== parseInt(req.userId)){
    return res.status(403).json({message: "Unauthorized"});
}
    const result = await pool.query(
        "SELECT b.challenger_id, b.opponent_id, o.username as opponent_name, b.start_date, b.end_date, b.status, b.winner_id FROM battles b LEFT JOIN users c ON b.challenger_id = c.id LEFT JOIN users o ON b.opponent_id = o.id WHERE (b.challenger_id = $1 OR b.opponent_id = $1)", [user]
    );

    res.status(200).json(result.rows);
}));

module.exports = router;

