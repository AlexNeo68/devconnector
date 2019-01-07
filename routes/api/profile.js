const passport = require("passport");
const express = require("express");
const router = express.Router();

const Profile = require("../../models/Profile");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Profile Ok!");
});

// @route   GET api/profile/all
// @desc    Return current user profile
// @access  Public
router.get("/all", (req, res) => {
  Profile.find()
    .then(profiles => {
      if (!profiles.length) {
        return res.status(404).json({ noprofiles: "Profiles not found" });
      }
      res.json(profiles);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET api/profile/handle/:handle
// @desc    Return current user profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ noprofile: "Profile not found" });
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Return current user profile by user_id
// @access  Public
router.get("/user/:user_id", (req, res) => {
  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        return res.status(404).json({ noprofile: "Profile not found" });
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET api/profile
// @desc    Return current user profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ noprofile: "Profile not found" });
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   POST api/profile
// @desc    Create of edit profile for current user
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateProfileInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    const newProfile = {
      user: req.user.id,
      handle: req.body.handle,
      status: req.body.status,
      location: req.body.location,
      company: req.body.company,
      website: req.body.website,
      githubusername: req.body.githubusername,
      bio: req.body.bio
    };

    if (typeof req.body.skills !== "undefined") {
      newProfile.skills = req.body.skills.split(",");
    }

    newProfile.social = {};
    if (req.body.youtube) newProfile.social.youtube = req.body.youtube;
    if (req.body.facebook) newProfile.social.facebook = req.body.facebook;
    if (req.body.twitter) newProfile.social.twitter = req.body.twitter;
    if (req.body.linkedin) newProfile.social.linkedin = req.body.linkedin;
    if (req.body.instagram) newProfile.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          Profile.findOne({ handle: req.body.handle })
            .then(profile => {
              if (profile)
                return res.status(400).json({ handle: "Handle already exist" });

              new Profile(newProfile)
                .save()
                .then(profile => res.json(profile))
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        } else {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: newProfile },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   POST api/profile/exprerience
// @desc    Add profile experience for current user
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateExperienceInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found";
          return res.status(400).json(errors);
        }

        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current
        };
        profile.experience.unshift(newExp);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            errors.nosave = err;
            res.status(400).json(errors);
          });
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   POST api/profile/education
// @desc    Add profile education for current user
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateEducationInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Profile not found";
          return res.status(400).json(errors);
        }

        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          description: req.body.description,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current
        };
        profile.education.unshift(newEdu);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            errors.nosave = err;
            res.status(400).json(errors);
          });
      })
      .catch(err => res.status(400).json(err));
  }
);

// @route   DELETE api/profile/experience/:id
// @desc    Delete profile experience for current user
// @access  Private

// @route   DELETE api/profile/education/:id
// @desc    Delete profile education for current user
// @access  Private

// @route   DELETE api/profile
// @desc    Delete profile & user records of current user
// @access  Private

module.exports = router;
