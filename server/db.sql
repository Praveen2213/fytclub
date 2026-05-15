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

CREATE TABLE battles (
  id SERIAL PRIMARY KEY,
  challenger_id INTEGER REFERENCES users(id),
  opponent_id INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'pending',
  activity_types TEXT[],
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  challenger_dare TEXT,
  opponent_dare TEXT,
  winner_id INTEGER REFERENCES users(id),
  invite_token VARCHAR,
  created_at TIMESTAMP DEFAULT NOW() 
);

CREATE TABLE battle_scores (
  id SERIAL PRIMARY KEY,
  battle_id INTEGER REFERENCES battles(id),
  user_id INTEGER REFERENCES users(id),
  score INTEGER DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE TABLE battle_events(
  id SERIAL PRIMARY KEY,
  battle_id INTEGER REFERENCES battles(id),
  user_id INTEGER REFERENCES users(id),
  message TEXT,
  activity_types VARCHAR(20),
  points_earned INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE ai_insights (
  id SERIAL PRIMARY KEY,
  battle_id INTEGER REFERENCES battles(id),
  user_id INTEGER REFERENCES users(id),
  content TEXT,
  generated_at TIMESTAMP DEFAULT NOW(),
  insight_type VARCHAR(20)
);

CREATE TABLE moods (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  score INTEGER,
  note TEXT,
  logged_at TIMESTAMP DEFAULT NOW()
);