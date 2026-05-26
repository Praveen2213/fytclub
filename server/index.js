require('dotenv').config();
const startCronJobs = require('./cron');
const express = require('express');
const app = express();
//for socket.io 
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server);
//done here 
const authRoutes = require('./routes/auth');
const usersProfileRoutes = require('./routes/users');
const activitiesRoutes = require('./routes/activities')(io);
const battleRoutes = require('./routes/battles')(io);
const dashboardRoutes = require("./routes/dashboard");
const historyRoutes = require("./routes/history");

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

startCronJobs(io);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', usersProfileRoutes);
app.use('/api/activities', activitiesRoutes);
app.use('/api/battles', battleRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/history", historyRoutes);

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    if(err.code === '23505') { //duplicate key error
        return res.status(400).json({ message: 'Email or username already exists' });
    }
    res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});