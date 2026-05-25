const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

//this is user's activity history
router.get("/:userId/activity_history", authMiddleware, wrapAsync(async (req, res) => {
    const user = req.params.userId;

    if (parseInt(user) !== parseInt(req.userId)) {
      return res.status(403).json({message: "Unauthorized"});
    }
    const result = await pool.query(
      `SELECT * FROM activities WHERE user_id = $1 ORDER BY logged_at DESC`,[user]
    );

    res.status(200).json(result.rows);
  }),
);

//users battle history
router.get('/:userId/battle_history', authMiddleware, wrapAsync(async(req, res)=>{
    const user = req.params.userId;
    if(parseInt(user) !== parseInt(req.userId)){
        return res.status(403).json({message: "Unauthorized"});
    }
    const result = await pool.query(
  `SELECT 
    b.id,
    b.challenger_id,
    b.opponent_id,
    b.challenger_dare,
    b.opponent_dare,
    b.activity_types,
    b.start_date,
    b.end_date,
    b.status,
    b.winner_id,
    c.username as challenger_name,
    o.username as opponent_name,
    bs_c.score as challenger_score,
    bs_o.score as opponent_score
   FROM battles b
   LEFT JOIN users c ON b.challenger_id = c.id
   LEFT JOIN users o ON b.opponent_id = o.id
   LEFT JOIN battle_scores bs_c ON bs_c.battle_id = b.id AND bs_c.user_id = b.challenger_id
   LEFT JOIN battle_scores bs_o ON bs_o.battle_id = b.id AND bs_o.user_id = b.opponent_id
   WHERE (b.challenger_id = $1 OR b.opponent_id = $1)`,
  [user]
);

    res.status(200).json(result.rows);
}));

//AI Insights
router.get('/:id/insights', authMiddleware, wrapAsync(async(req, res)=>{
    const battle_id = req.params.id;
    const result = await pool.query(
        "SELECT * FROM ai_insights WHERE battle_id = $1", [battle_id]
    );

    return res.status(200).json(result.rows);
}));

module.exports = router;
