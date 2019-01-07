const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const keys = require("../../config/key");

const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Users Ok!");
});

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post("/register", (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.userexist = "Uset with sented email already exist in database";
        return res.status(400).json(errors);
      }
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        avatar
      });
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          if (err) res.status(400).json(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        });
      });
    })
    .catch(err => res.status(400).json(err));
});

// @route   POST api/users/login
// @desc    Login users
// @access  Public
router.post("/login", (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        errors.nofound = "User not found";
        res.status(400).json(errors);
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) return res.status(400).json(err);
        if (!isMatch) {
          errors.password = "Password not match with sent email";
          res.status(404).json(errors);
        }
        const payload = {
          email: user.email,
          id: user._id,
          name: user.name,
          avatar: user.avatar
        };
        jwt.sign(
          payload,
          keys.secretOnKey,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) {
              errors.sign = err;
              res.status(400).json(errors);
            }
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      });
    })
    .catch(err => {
      errors.catch = err;
      res.status(400).json(errors);
    });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
