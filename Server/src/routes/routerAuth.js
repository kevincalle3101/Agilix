const { Router } = require("express");
const passport = require("passport");

require("dotenv").config();
const { CLIENT_URL } = process.env;

const routerAuth = Router();

routerAuth.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Autentificacion Exitosa",
      user: req.user,
    });
  } else {
    res
      .status(401)
      .json({ error: true, message: "Fallo en la Autentificacion" });
  }
});

routerAuth.get("/login/failed", (req, res) => {
  res.status(401).json({ error: true, message: "Fallo en la Autentificacion" });
});

routerAuth.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
  // (req, res) => {
  //   console.log("wooo we authenticated, here is our user object:", req.user);
  // }
);

routerAuth.get(
  "/google",
  passport.authenticate("google", ["profile", "email"])
);

routerAuth.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = routerAuth;
