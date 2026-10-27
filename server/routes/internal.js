const express = require("express");
const crypto = require("crypto");
const runBattleJobs = require("../cron");

const router = express.Router();

const safeEqual = (a = "", b = "") => {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && crypto.timingSafeEqual(A, B);
};

router.post("/complete-battles", async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (!secret || !safeEqual(req.headers["x-cron-secret"], secret)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    await runBattleJobs(req.app.get("io"));
    res.json({ ok: true });
  } catch (err) {
    console.error("Cron route failed:", err);
    res.status(500).json({ error: "Job failed" });
  }
});

module.exports = router;