const express = require("express");
const router = express.Router();
const pool = require("../db");
const authMiddleware = require("../middleware");
const wrapAsync = require("../utils/wrapAsync");

router.get("/:userId", authMiddleware, wrapAsync(async (req, res) => {
    const user = req.params.userId;

    if (parseInt(user) !== parseInt(req.userId)) {
      return res.status(403).json({message: "Unauthorized"});
    }
    //this is user's activity history
    const result = await pool.query(
      `SELECT * FROM activities WHERE user_id = $1 ORDER BY logged_at DESC`,[user]
    );

    res.status(200).json(result.rows);
  }),
);

module.exports = router;
