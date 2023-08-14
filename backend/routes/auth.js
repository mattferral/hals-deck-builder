const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const { BadRequestError } = require("../expressError");

const express = require("express");
const router = express.Router();


/** POST /auth/token:  { username, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new BadRequestError("Missing fields: Expected { username, password }");

    const user = await User.authenticate(username, password);
    const token = createToken(user);

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});


/** POST /auth/register:   { user } => { token }
 *
 * user must include { username, password, email }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 * Authorization required: none
 */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email)
      throw new BadRequestError("Missing fields: Expected { username, password, email }");

    const newUser = await User.register({ ...req.body, isAdmin: false });
    const token = createToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;