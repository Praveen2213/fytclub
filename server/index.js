require('dotenv').config();

const cron = require('node-cron');
const express = require('express');
const app = express();
const pool = require('./db');
//for socket.io 
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
//done here 
const authRoutes = require('./routes/auth');
const usersProfileRoutes = require('./routes/users');
const activitiesRoutes = require('./routes/activities')(io);
const authMiddleware = require('./middleware');
const usersImageUploadRoutes = require('./routes/users');
const battleRoutes = require('./routes/battles');

// Socket.io — real-time connection handler
io.on('connection', (socket)=>{
    console.log('A user connected:', socket.id);

    // User battle room mein join karo
    socket.on('join battle', (battleId) => {
        socket.join(`battle_${battleId}`);
        console.log(`user joined battle room: battle_${battleId}`);
    });

    // User disconnect hone pe log karo
    socket.on('disconnect', () =>{
        console.log('user disconnected:', socket.id);
    });
});

// Cron job — har ghante expired battles check karo aur winner decide karo
cron.schedule('* * * * *', async () => {
  console.log('Checking for completed battles...');
  
  const expiredBattles = await pool.query(
    "SELECT * FROM battles WHERE status = 'active' AND end_date < NOW()"
  );

  for(const battle of expiredBattles.rows) {
    const scores = await pool.query(
      "SELECT * FROM battle_scores WHERE battle_id = $1", [battle.id]
    );

    const score1 = scores.rows[0];
    const score2 = scores.rows[1];

    const winner = score1.score > score2.score ? score1.user_id : score2.user_id;

    await pool.query(
      "UPDATE battles SET status = 'completed', winner_id = $1 WHERE id = $2",
      [winner, battle.id]
    );

    await pool.query(
      "UPDATE users SET total_wins = total_wins + 1 WHERE id = $1", [winner]
    );

    const loser = winner === score1.user_id ? score2.user_id : score1.user_id;
    
    await pool.query(
      "UPDATE users SET total_losses = total_losses + 1 WHERE id = $1", [loser]
    );

    const winner_name = await pool.query(
        "SELECT username FROM users WHERE id = $1",[winner]
    );

    console.log(`Battle ${battle.id} completed. Winner: ${winner_name.rows[0].username}`);
  }
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', usersProfileRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/users', usersImageUploadRoutes);
app.use('/api/battles', battleRoutes);

app.get('/', async (req, res)=> {
    const result = await pool.query('SELECT NOW()');
    res.send(`Database connected: ${result.rows[0].now}`);
});

app.get('/protected', authMiddleware, (req, res) =>{
    res.json({message: 'Protected route is working', userId: req.userId});
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});