const { generateInsight } = require('../ai');
const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");
const wrapAsync = require('../utils/wrapAsync');
const {activityLimit} = require('../limiter');
const { validateActivity } = require("../validator");
const { validationResult } = require('express-validator');
module.exports = (io) => {

function calculatePoints(type, value) {
    const normalizedType = type.toLowerCase();
  if (normalizedType === "steps") {
    if(value < 50) return 0;
    const points = Math.floor(value/50);
    return points;
  } else if (normalizedType === "run") { //take unit always in km
    if(value < 0.5) return 0;
    const points = Math.floor(value*50);
    return points;
  }else if(normalizedType === 'gym'){
    return 100;
  }else if(normalizedType === 'water'){
    if(value < 100) return 0;
    const points = Math.floor(value/50);
    return points;
  }else if(normalizedType === 'sleep'){
    if(value < 240){
        const points = Math.floor((240 - value)/10*2);
        return -points;
    }else{
        let points = 0;
        if(value < 420){
            points = Math.floor((value*2)/10);
        }else if(value >= 420 && value <= 480){
            points = Math.floor((420*2)/10);
            points += 10;
        }else{
            points = Math.floor((420*2)/10);
            const val = Math.floor(((value - 480)*2)/10);
            points -= val;
        }
        return points;
    }
  }else{
    return 25;
  }
}

//function to generate a message
function generateMessage(type, value, points, username, unit){
  return `${username} logged a ${type} of ${value} ${unit}, ${points} points`;
};

router.post("/", authMiddleware, activityLimit, validateActivity, wrapAsync(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()}); 
  }
  const { type, value, unit } = req.body;
  const user_id = req.userId;

  const points = calculatePoints(type, value);

  //activity save kro
  const result = await pool.query(
    "INSERT INTO activities (user_id, type, value, unit, points) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, type, value, unit, points, logged_at",
    [user_id, type, value, unit, points]
  );

  //quick log — us type ki saari active battles
  const battleResult = await pool.query(
    `SELECT * FROM battles 
     WHERE (challenger_id = $1 OR opponent_id = $1) 
     AND status = 'active'
     AND $2 = ANY(activity_types)`,
    [user_id, type]
  );
  let battles = battleResult.rows;

  if(battles.length === 0){
    return res.status(200).json(result.rows[0]);
  }

  //fetching username from users DB
  const user = await pool.query(
    "SELECT username FROM users WHERE id = $1", [user_id]
  ); 

  const username = user.rows[0].username;

for(const battle of battles){
  const msg = generateMessage(type, value, points, username, unit);

  //battle event db me save kro
  const event_save = await pool.query(
    "INSERT INTO battle_events (battle_id, user_id, activity_types, points_earned, message) VALUES ($1, $2, $3, $4, $5)", [battle.id, user_id, type, points, msg]
  );

  //updating battle score
  await pool.query(
    "UPDATE battle_scores SET score = score + $1, last_updated = NOW() WHERE battle_id = $2 AND user_id = $3", [points, battle.id, user_id]
  );

  io.to(`battle_${battle.id}`).emit('score_update', {
    userId: user_id,
    points: points,
    battleId: battle.id
  });

  const opponent_id = battle.challenger_id === user_id 
                      ? battle.opponent_id 
                      : battle.challenger_id;

  //prompt for ai
  const prompt = `You are a witty fitness battle analyst.
                  Player ${username} just logged ${value} ${unit} of ${type} and earned ${points} points.
                  Write ONE funny trash talk line (max 15 words) to send to their opponent. Be savage but friendly.`;
  
  //ai generated response using prompt
  const response = await generateInsight(prompt); 

  const insights = await pool.query(
    "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)", [battle.id, opponent_id, response, 'taunt']
  );

  io.to(`battle_${battle.id}`).emit('ai_taunt', {
    battleId: battle.id,
    message: response
  });
}
  res.status(200).json(result.rows[0]);
}));

router.get("/", authMiddleware, wrapAsync(async (req, res) => {
    const user_id = req.userId;
    const activities = await pool.query(
      `SELECT *
       FROM activities
       WHERE user_id = $1
       ORDER BY logged_at DESC`,
      [user_id]
    );

    res.json(activities.rows);
  })
);

  return router;
};
