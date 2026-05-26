const cron = require("node-cron");
const pool = require("./db");
const { generateInsight } = require("./ai");

const startCronJobs = (io) => {
  // Cron job — har ghante expired battles check karo aur winner decide karo
  cron.schedule("0 * * * *", async () => {
    console.log("Checking for completed battles...");

    const expiredBattles = await pool.query(
      "SELECT * FROM battles WHERE status = 'active' AND end_date < NOW()",
    );

    for (const battle of expiredBattles.rows) {
      const scores = await pool.query(
        "SELECT * FROM battle_scores WHERE battle_id = $1",
        [battle.id],
      );

      const score1 = scores.rows[0];
      const score2 = scores.rows[1];

      const winner =
        score1.score > score2.score ? score1.user_id : score2.user_id;

      await pool.query(
        "UPDATE battles SET status = 'completed', winner_id = $1 WHERE id = $2",
        [winner, battle.id],
      );

      await pool.query(
        "UPDATE users SET total_wins = total_wins + 1 WHERE id = $1",
        [winner],
      );

      const loser = winner === score1.user_id ? score2.user_id : score1.user_id;

      await pool.query(
        "UPDATE users SET total_losses = total_losses + 1 WHERE id = $1",
        [loser],
      );

      const winner_name = await pool.query(
        "SELECT username FROM users WHERE id = $1",
        [winner],
      );

      console.log(
        `Battle ${battle.id} completed. Winner: ${winner_name.rows[0].username}`,
      );

      // Final battle report
      const player1 = await pool.query(
        "SELECT u.username, bs.score FROM battle_scores bs JOIN users u ON u.id = bs.user_id WHERE bs.battle_id = $1 AND bs.user_id = $2",
        [battle.id, score1.user_id],
      );

      const player2 = await pool.query(
        "SELECT u.username, bs.score FROM battle_scores bs JOIN users u ON u.id = bs.user_id WHERE bs.battle_id = $1 AND bs.user_id = $2",
        [battle.id, score2.user_id],
      );

      const reportPrompt = `You are a fitness battle analyst. Write a short final battle report (max 40 words).
${player1.rows[0].username} scored ${player1.rows[0].score} points.
${player2.rows[0].username} scored ${player2.rows[0].score} points.
Winner is ${winner_name.rows[0].username}. Make it exciting and motivational.`;

      const report = await generateInsight(reportPrompt);

      await pool.query(
        "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
        [battle.id, winner, report, "final"],
      );

      io.to(`battle_${battle.id}`).emit("battle_report", { message: report });

      console.log(`Final report generated for battle ${battle.id}`);
    }

    // Mid-battle analysis — 3 din baad
    const midBattles = await pool.query(
      "SELECT * FROM battles WHERE status = 'active' AND start_date <= NOW() - INTERVAL '3 days' AND midweek_sent = false",
    );

    for (const battle of midBattles.rows) {
      const scores = await pool.query(
        "SELECT bs.user_id, bs.score, u.username FROM battle_scores bs JOIN users u ON u.id = bs.user_id WHERE bs.battle_id = $1 ORDER BY bs.score ASC",
        [battle.id],
      );

      const losingPlayer = scores.rows[0]; // sabse kam score
      const leadingPlayer = scores.rows[1]; // sabse zyada score

      const prompt = `You are a fitness battle coach. ${losingPlayer.username} is losing with ${losingPlayer.score} points. Their opponent has ${leadingPlayer.score} points. Write a short motivational message (max 20 words) to help them catch up.`;

      const response = await generateInsight(prompt);

      await pool.query(
        "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
        [battle.id, losingPlayer.user_id, response, "midweek"],
      );

      await pool.query("UPDATE battles SET midweek_sent = true WHERE id = $1", [
        battle.id,
      ]);

      io.to(`battle_${battle.id}`).emit("midweek_analysis", {
        userId: losingPlayer.user_id,
        message: response,
      });

      console.log(`Midweek analysis sent for battle ${battle.id}`);
    }
  });
};

module.exports = startCronJobs;
