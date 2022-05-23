// external imports
const express = require("express");
const { isLoggedIn } = require("../middleware/checklogin");
const passport = require("passport");

const router = express.Router();

// google signup
router.get("/failed", (req, res) => res.send("You Failed to log in!"));

// In this route you can see that if the user is logged in u can acess his info in: req.user
router.get("/sucess", isLoggedIn, (req, res) => {
//   console.log(req);
  res.send(`Welcome mr ${req.user.displayName}! `);
});
// Auth Routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/api/sucess");
  }
);

router.get("/logout", (req, res) => {
  req.session.user = null;
  req.logout();
  res.redirect("/");
});
//


module.exports = router;
