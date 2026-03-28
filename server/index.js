require('dotenv').config();

const express = require('express');
const app = express();
const pool = require('./db');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware');

app.use(express.json());
app.use('/api/auth', authRoutes);

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