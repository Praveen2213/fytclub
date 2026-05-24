const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router.get("/", authMiddleware, wrapAsync(async (req, res) => {
  const user_id = req.userId;

  // USER INFO
  const userResult = await pool.query(
    `SELECT username, total_wins, total_losses, created_at FROM users WHERE id = $1`,[user_id]
  );

  // TOTAL ACTIVITIES
  const activitiesResult = await pool.query(
    `SELECT COUNT(*) FROM activities WHERE user_id = $1`,[user_id]
  );

  // TOTAL POINTS
  const pointsResult = await pool.query(
    `SELECT COALESCE(SUM(points),0) FROM activities WHERE user_id = $1`, [user_id]
  );

  // RUN DISTANCE
  const runResult = await pool.query(
    `SELECT COALESCE(SUM(value),0) FROM activities WHERE user_id = $1 AND type = 'run'`, [user_id]
  );

  // ACTIVE BATTLES
  const battleResult = await pool.query(
    `SELECT COUNT(*) FROM battles WHERE (challenger_id = $1 OR opponent_id = $1) AND status = 'active'`, [user_id]
  );

  // EXTRACT VALUES
  const user = userResult.rows[0];
  const totalActivities = activitiesResult.rows[0].count;
  const totalPoints = Number(pointsResult.rows[0].coalesce);
  const totalRunDistance = runResult.rows[0].coalesce;
  const activeBattles = battleResult.rows[0].count;

  // TEMP CALCULATIONS
  const calories = totalPoints * 2;
  const streak = 7;

  // FINAL RESPONSE
  res.json({
    username: user.username,
    totalWins: user.total_wins,
    totalLosses: user.total_losses,
    joinedAt: user.created_at,
    totalActivities,
    totalPoints,
    totalRunDistance,
    activeBattles,
    calories,
    streak,
  });
}));

module.exports = router;
