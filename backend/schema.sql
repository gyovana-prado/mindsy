-- Tabela de usuários
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    google_id VARCHAR(100),
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabela de tarefas
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) NOT NULL,
    points INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    due_date DATE,
    created_at TIMESTAMP DEFAULT now(),
    completed_at TIMESTAMP
);

-- Tabela de recompensas
CREATE TABLE rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    points_needed INTEGER NOT NULL,
    available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabela de boosts
CREATE TABLE boosts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    value INTEGER NOT NULL,
    expires_at TIMESTAMP,
    used BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT now()
);

-- Tabela de logs de tarefas
CREATE TABLE task_logs (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id),
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT now()
); 