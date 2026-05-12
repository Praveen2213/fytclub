require('dotenv').config();

const express = require('express');
const app = express();
const pool = require('./db');
const authRoutes = require('./routes/auth');
const usersProfileRoutes = require('./routes/users');
const activitiesRoutes = require('./routes/activities');
const authMiddleware = require('./middleware');
const usersImageUploadRoutes = require('./routes/users');
const battleRoutes = require('./routes/battles');

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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});