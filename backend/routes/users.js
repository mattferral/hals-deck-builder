const User = require("../models/user");
const {
  ensureCorrectUserOrAdmin,
  ensureAdmin,
  ensureLoggedIn,
} = require("../middleware/auth");

const express = require("express");
const { BadRequestError } = require("../expressError");
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


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { password, email }
 *
 * Returns { username, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const { password, email } = req.body;
    if (!password && !email)
      return res.status(204).json({ message: "Expecting email or password"});

    const user = await User.update(req.params.username, data);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username]/matches => { matchHistory }
 *
 * Returns { matchHistory: [{ id, opponent, winner }...] }
 *
 * Authorization required: user
 **/

router.get("/:username/matches", ensureLoggedIn, async function (req, res, next) {
  try {
    const matchHistory = await User.getMatchHistory(req.params.username);
    return res.status(201).json({ matchHistory });
  } catch (err) {
    return next(err);
  }
});


/** POST /matches => { match }
 *
 * Returns { match: { id, player1, player2, winner } }
 *
 * Authorization required: admin
 **/

router.post("/matches", ensureAdmin, async function (req, res, next) {
  try {
    const { player1, player2, winner } = req.params;
    if (!player1 || !player2 || winner)
      throw BadRequestError("Missing fields: Expected { player1, player2, winner }");

    const match = await User.addMatch(player1, player2, winner);
    return res.json({ match });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /matches/[id]  =>  { deleted: id }
 *
 * Authorization required: admin
 **/

router.delete("/matches/:id", ensureAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;