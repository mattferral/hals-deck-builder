
const db = require("../db");
const bcrypt = require("bcrypt");



const {
  UnauthorizedError,
  NotFoundError
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {

  static async authenticate(username, password) {
    const result = await db.query(
      `SELECT username,
              password,
          FROM users
          WHERE username = $1`,
      [username]
    );
    
    const user = result.rows[0];

    if (user) {
      if (await bcrypt.compare(user.password, password)) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid Username/Password");
  }


  static async register({ username, password, email, isAdmin }) {
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
                          password,
                          is_admin)
          VALUES ($1, $2, $3, $4)
          RETURNING username, password, email, is_admin AS "isAdmin"`,
      [
        username,
        hashedPassword,
        email,
        isAdmin,
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
    const result = await db.query(
          `SELECT username,
                  email,
                  is_admin AS "isAdmin"
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

}

module.exports = User;