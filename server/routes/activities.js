const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");
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

router.post("/", authMiddleware, async (req, res) => {
  const { type, value, unit } = req.body;
  const user_id = req.userId;

  const points = calculatePoints(type, value);

  //activity save kro
  const result = await pool.query(
    "INSERT INTO activities (user_id, type, value, unit, points) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, type, value, unit, points, logged_at",
    [user_id, type, value, unit, points]
  );

  //battle dhundho
  const battle = await pool.query(
    "SELECT * FROM battles WHERE (challenger_id = $1 OR opponent_id = $1) AND status = 'active' ", [user_id]
  );

  if(!battle.rows[0]){
    return res.status(200).json(result.rows[0]);
  }

  //fetching username from users DB
  const user = await pool.query(
    "SELECT username FROM users WHERE id = $1", [user_id]
  ); 

  const username = user.rows[0].username;

  const msg = generateMessage(type, value, points, username, unit);

  //battle event db me save kro
  const event_save = await pool.query(
    "INSERT INTO battle_events (battle_id, user_id, activity_types, points_earned, message) VALUES ($1, $2, $3, $4, $5)", [battle.rows[0].id, user_id, type, points, msg]
  );

  io.to(`battle_${battle.rows[0].id}`).emit('score_update', result.rows[0]);

  res.status(200).json(result.rows[0]);
});


  return router;
};
