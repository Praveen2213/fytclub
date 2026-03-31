const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");

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

router.post("/", authMiddleware, async (req, res) => {
  const { type, value, unit } = req.body;
  const user_id = req.userId;

  const points = calculatePoints(type, value);

  const result = await pool.query(
    "INSERT INTO activities (user_id, type, value, unit, points) VALUES ($1, $2, $3, $4, $5) RETURNING user_id, type, value, unit, points, logged_at",
    [user_id, type, value, unit, points]
  );

  res.status(200).json(result.rows[0]);
});

module.exports = router;
