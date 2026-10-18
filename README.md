FYTCLUB

Real-time competitive fitness battles platform. Challenge a friend, log workouts, and watch the leaderboard update live.

Live demo: https://fytclub.vercel.app/

Why FYTCLUB?

Most fitness trackers are lonely. FYTCLUB turns consistency into a head-to-head game: you challenge an opponent, every logged activity earns points, and the live leaderboard keeps both of you coming back.

## Features

1v1 battles: invite an opponent through a shareable link and compete over a set period

Real-time updates: scores and events stream to both players instantly over Socket.IO rooms

Live leaderboard: rankings update as activities are logged

Points system: a points formula covering six activity types

Two logging modes:

Battle logging: the activity counts toward a specific battle (battle_id in the request body)

Quick log: a standalone activity, not tied to any battle

AI taunts: Gemini-powered trash talk during battles

Battle history: enriched history of past battles (opponent, scores, outcome)

Auth: JWT login, bcrypt-hashed passwords, auto-login after signup

Battle integrity checks: no battling yourself, opponent verification, and duplicate prevention (one active battle per user pair)

Tech Stack

- Frontend: React (Vercel)
- Backend: Node.js, Express, Socket.IO (Render)
- Database: PostgreSQL on Supabase (`pg` connection pool)
- Other: Cloudinary, Gemini API
