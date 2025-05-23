CREATE TABLE tarefas (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  points INTEGER NOT NULL,
  due_date DATE,
  concluida BOOLEAN DEFAULT false,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 