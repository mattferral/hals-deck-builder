const User = require("../models/user");
const {
  ensureLoggedIn,
  ensureAdmin,
} = require("../middleware/auth")

const express = require("express");
const { BadRequestError } = require("../expressError");
const router = express.Router();


/** POST /matches => { match }
 *
 * Returns { match: { id, player1, player2, winner } }
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async function (req, res, next) {
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

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await User.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


/** GET /rankings => { users } 
 * 
 * Returns { users: [user1...] }
 * 
 * Authorization required: user
*/

router.get("/rankings", ensureLoggedIn, async function (req, res, next) {
  try {
    const users = await User.getRankings();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;