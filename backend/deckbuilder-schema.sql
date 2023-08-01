CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  username_1 VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  username_2 VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
  winner VARCHAR(25) NOT NULL
    REFERENCES users ON DELETE CASCADE,
);