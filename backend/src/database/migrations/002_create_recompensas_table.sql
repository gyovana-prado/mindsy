CREATE TABLE recompensas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT,
  custo_em_pontos INTEGER NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 