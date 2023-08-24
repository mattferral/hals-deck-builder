
const db = require("../db");
const bcrypt = require("bcrypt");

const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
              password
          FROM users
          WHERE username = $1`,
      [username]
    );
    
    const user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid Username/Password");
  }


  static async register({ username, password, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
          FROM users
          WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Username '${username}' already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users (username,
                          email,
                          password)
          VALUES ($1, $2, $3)
          RETURNING username, password, email, is_admin AS "isAdmin"`,
      [
        username,
        email,
        hashedPassword,
      ],
    );

    const user = result.rows[0];

    return user;
  }


  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const setCols = Object.keys(data).map((key, idx) => ` ${key} = $${idx+1}`).join().slice(1);
    const usernameIdx = Object.keys(data).length + 1;
    const values = Object.values(data);

    const result = await db.query(`
      UPDATE users
      SET ${setCols}
      WHERE username = ${usernameIdx}
      RETURNING username,
                email,
                is_admin as "isAdmin"`,
        [...values, username]
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }

  
  static async remove(username) {
    let result = await db.query(
          `DELETE
              FROM users
              WHERE username = $1
              RETURNING username`,
        [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }


  static async get(username) {
    const userResult = await db.query(
          `SELECT username,
                  email,
                  is_admin AS "isAdmin"
              FROM users
              WHERE username = $1`,
        [username],
    );

    const matchesResult = await db.query(
          `SELECT *
              FROM matches as m
              WHERE m.username_1 = $1 OR m.username_2 = $1`,
        [username],
    );

    const user = userResult.rows[0];
    const matchHistory = matchesResult.rows;
    user.matchHistory = matchHistory;

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }


  static async getRankings() {
    const result = await db.query(
          `SELECT ROW_NUMBER() OVER() AS rank,
                  u.username,
                  COUNT(m.winner) as wins
              FROM users as u
              LEFT JOIN matches as m
              ON u.username = m.winner
              GROUP BY u.username
              ORDER BY wins DESC`
    );
    
    const rankings = result.rows;

    return rankings;
  }


  static async addMatch(player1, player2, winner) {
    const result = await db.query(
          `INSERT INTO matches (username_1,
                                username_2,
                                winner)
              VALUES ($1, $2, $3)
           RETURNING id,
                     username_1 as player1,
                     username_2 as player2,
                     winner`,
          [player1, player2, winner],
    );
    
    const match = result.rows[0];
    
    return match;
  }

  static async removeMatch(id) {
    const result = await db.query(
          `DELETE
           FROM matches
           WHERE id = $1
           RETURNING id`,
        [id],
    );
    const match = result.rows[0];

    if (!match) throw new NotFoundError(`No match: ${id}`);
  }

  
  static async getMatchHistory(username) {
    const result = await db.query(
          `SELECT *
              FROM matches as m
              WHERE m.username_1 = $1 OR m.username_2 = $1`,
        [username],
    );
    
    const matchHistory = result.rows;

    return matchHistory;
  }

}

module.exports = User;