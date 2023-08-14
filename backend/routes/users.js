const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin
} = require("../middleware/auth");

const express = require("express");
const router = express.Router();

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, matchHistory }
 *   where matchHistory is { matches: [{id, opponent, winner}...] }
 *
 * Authorization required: admin or same user-as-:username
 **/

router.get("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;