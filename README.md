FYTCLUB

Real-time competitive fitness battles platform. Challenge a friend, log workouts, and watch the leaderboard update live.

Live demo: https://fytclub.vercel.app/

Why FYTCLUB?

Most fitness trackers are lonely. FYTCLUB turns consistency into a head-to-head game: you challenge an opponent, every logged activity earns points, and the live leaderboard keeps both of you coming back.

Features:
1v1 battles: invite an opponent through a shareable link and compete over a set period.
Real-time updates: scores and events stream to both players instantly over Socket.IO rooms.
Live leaderboard: rankings update as activities are logged.
Points system: a points formula covering six activity types.
Two logging modes:
->Battle logging: an activity counts toward a specific battle (battle_id in the request body).
->Quick log: a standalone activity, not tied to any battle.
AI taunts: Gemini-powered trash talk during battles.
Battle history: enriched history of past battles (opponent, scores, outcome).
Auth: JWT-based login with bcrypt-hashed passwords; auto-login after signup.
Battle integrity checks:
No battling yourself
Opponent verification
Duplicate prevention (one active battle per user pair)

Tech Stack

- Frontend: React (Vercel)
- Backend: Node.js, Express, Socket.IO (Render)
- Database: PostgreSQL on Supabase (`pg` connection pool)
- Other: Cloudinary, Gemini API

Project Status and Roadmap

FYTCLUB is actively being built. Below are Planned improvements:

 -Fix express rate limit behind a proxy (trust proxy)
 -Move battle completion cron from in process node cron to a protected route triggered by an external scheduler (free tier hosting spins down, so in process jobs are unreliable)
 -Reconnect and replay for Socket.IO: on rejoin, resend missed events since the client's last-seen timestamp
 -Review auth on the battle invite-accept route
 -Load test with synthetic traffic and document the results
 -Background job queue (BullMQ on Redis) for async work
 -Enable and configure Row-Level Security as defense in depth
