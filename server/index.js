require('dotenv').config();

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


io.on('connection', (socket)=>{
    console.log('A user connected:', socket.id);

    socket.on('join battle', (battleId) => {
        socket.join(`battle_${battleId}`);
        console.log(`user joined battle room: battle_${battleId}`);
    });

    socket.on('disconnect', () =>{
        console.log('user disconnected:', socket.id);
    });
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