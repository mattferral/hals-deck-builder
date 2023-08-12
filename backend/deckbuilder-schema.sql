CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  isAdmin BOOLEAN NOT NULL DEFAULT FALSE,
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