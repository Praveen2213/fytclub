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
    try {
      const scores = await pool.query(
        "SELECT * FROM battle_scores WHERE battle_id = $1",
        [battle.id],
      );

      if (scores.rows.length < 2) {
          console.log(`Battle ${battle.id} skipped — not enough players`);
          continue;
      }

      const score1 = scores.rows[0];
      const score2 = scores.rows[1];

      //Draw Handler
      if (score1.score === score2.score) {
          await pool.query(
            "UPDATE battles SET status = 'draw', winner_id = NULL WHERE id = $1",
            [battle.id],
          );

          const drawPrompt = `You are a fitness battle analyst. Write a short exciting draw announcement (max 30 words).
          Both players scored ${score1.score} points each. It's a perfect tie! Make it dramatic.`;

          const drawReport = await generateInsight(drawPrompt);
          const drawMessage = drawReport || "It's a draw! Both warriors fought equally hard. Rematch anyone? 🤝";

          await pool.query(
            "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
            [battle.id, score1.user_id, drawMessage, "final"],
          );

          io.to(`battle_${battle.id}`).emit("battle_report", {
            isDraw: true,
            message: drawMessage,
          });

          console.log(`Battle ${battle.id} ended in a DRAW`);
          continue; // skip winner/loser logic
      }

      //winner/loser logic
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
      const finalReport = report || `${winner_name.rows[0].username} wins the battle! Amazing performance! 🏆`;

      await pool.query(
        "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
        [battle.id, winner, finalReport, "final"],
      );

      io.to(`battle_${battle.id}`).emit("battle_report", { 
          isDraw: false,
          winnerId: winner,
          message: finalReport 
        });

      console.log(`Final report generated for battle ${battle.id}`);
    } catch (err) {
        console.error(`Error processing battle ${battle.id}:`, err.message);
    }
  }

    // Mid-battle analysis — 3 din baad
    const midBattles = await pool.query(
      "SELECT * FROM battles WHERE status = 'active' AND start_date <= NOW() - INTERVAL '3 days' AND midweek_sent = false",
    );

    for (const battle of midBattles.rows) {
    try{
      const scores = await pool.query(
        "SELECT bs.user_id, bs.score, u.username FROM battle_scores bs JOIN users u ON u.id = bs.user_id WHERE bs.battle_id = $1 ORDER BY bs.score ASC",
        [battle.id],
      );

      if (scores.rows.length < 2) {
          console.log(`Battle ${battle.id} midweek skipped — not enough players`);
          continue;
      }

      const losingPlayer = scores.rows[0]; // sabse kam score
      const leadingPlayer = scores.rows[1]; // sabse zyada score

      //midweek draw check
      if (losingPlayer.score === leadingPlayer.score) {
          const tiePrompt = `You are a fitness battle coach. Both players are tied at ${losingPlayer.score} points at the halfway mark! Write a short motivational message (max 20 words) to fire them both up.`;

          const tieResponse = await generateInsight(tiePrompt);
          const tieMessage  = tieResponse || "It's neck and neck! Give it everything you've got in the final stretch! 💪";

          // send to both players
          for (const player of scores.rows) {
            await pool.query(
              "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
              [battle.id, player.user_id, tieMessage, "midweek"],
            );
          }

          await pool.query("UPDATE battles SET midweek_sent = true WHERE id = $1", [battle.id]);

          io.to(`battle_${battle.id}`).emit("midweek_analysis", {
            isDraw: true,
            message: tieMessage,
          });

          console.log(`Midweek tie analysis sent for battle ${battle.id}`);
          continue;//skip midweek winner/looser logic
      }

      //Midweek winner/looser logic
      const prompt = `You are a fitness battle coach. ${losingPlayer.username} is losing with ${losingPlayer.score} points. Their opponent has ${leadingPlayer.score} points. Write a short motivational message (max 20 words) to help them catch up.`;

      const response = await generateInsight(prompt);
      const midMessage  = response || `Come on ${losingPlayer.username}! You can still turn this around! 🔥`;

      await pool.query(
        "INSERT INTO ai_insights (battle_id, user_id, content, insight_type) VALUES ($1, $2, $3, $4)",
        [battle.id, losingPlayer.user_id, midMessage, "midweek"],
      );

      await pool.query("UPDATE battles SET midweek_sent = true WHERE id = $1", 
        [battle.id]
      );

      io.to(`battle_${battle.id}`).emit("midweek_analysis", {
        isDraw: false,
        userId: losingPlayer.user_id,
        message: response,
      });

      console.log(`Midweek analysis sent for battle ${battle.id}`);
    }catch (err) {
        console.error(`Error processing midweek for battle ${battle.id}:`, err.message);
      }
    }
  });
};

module.exports = startCronJobs;
