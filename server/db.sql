CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE activities(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(20) NOT NULL, 
  value NUMERIC NOT NULL,
  unit VARCHAR(20),
  points INTEGER DEFAULT 0,
  logged_at TIMESTAMP DEFAULT NOW() 
);