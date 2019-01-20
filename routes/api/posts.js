const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

const validatePostInput = require("../../validation/post");

// @route   GET api/posts/test
// @desc    Test the post route
// @access  Public
router.get("/test", (req, res) => {
  res.send("Posts Ok!");
});

// @route   GET api/posts
// @desc    Get all created posts
// @access  Public
router.get("/", (req, res) => {
  const errors = {};
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      errors.catch = err;
      return res.status(400).json(errors);
    });
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get("/:id", (req, res) => {
  const errors = {};
  Post.findById(req.params.id)
    .then(post => {
      res.json(post);
    })
    .catch(err => {
      errors.catch = err;
      return res.status(400).json(errors);
    });
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      isValid,
      errors
    } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }
        const newPost = new Post({
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        });
        newPost
          .save()
          .then(post => res.json(post))
          .catch(err => {
            errors.catch = err;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        return res.status(400).json(errors);
      });
  }
);

// @route   POST api/posts/:id/like
// @desc    Like post by id
// @access  Private
router.post(
  "/:id/like",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }
        Post.findById(req.params.id)
          .then(post => {
            if (!post) {
              errors.nopost = "Post not found by id";
              return res.status(400).json(errors);
            }
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
            ) {
              errors.likedyet = "Current user already liked this post";
              return res.status(400).json(errors);
            }
            post.likes.unshift({
              user: req.user.id
            });
            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.catch = err;
                return res.status(400).json(errors);
              });
          })
          .catch(err => {
            errors.catch = err;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        return res.status(400).json(errors);
      });
  }
);

// @route   POST api/posts/:id/unlike
// @desc    Unlike post by id
// @access  Private
router.post(
  "/:id/unlike",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }
        Post.findById(req.params.id)
          .then(post => {
            if (!post) {
              errors.nopost = "Post not found by id";
              return res.status(400).json(errors);
            }
            if (
              post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
            ) {
              errors.likednot = "Current user not liked this post";
              return res.status(400).json(errors);
            }

            const removeIndex = post.likes
              .map(like => like.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.catch = err;
                return res.status(400).json(errors);
              });
          })
          .catch(err => {
            errors.catch = err;
            errors.catchPostFind = true;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        errors.catchProfileFind = true;
        return res.status(400).json(errors);
      });
  }
);

// @route   POST api/posts/:id/comment
// @desc    Add comment to post by id
// @access  Private
router.post(
  "/:id/comment",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const {
      isValid,
      errors
    } = validatePostInput(req.body);
    if (!isValid) return res.status(400).json(errors);

    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }
        Post.findById(req.params.id)
          .then(post => {
            if (!post) {
              errors.nopost = "Post not found by id";
              return res.status(400).json(errors);
            }

            const newComment = {
              user: req.user.id,
              text: req.body.text,
              name: req.body.name,
              avatar: req.body.avatar
            };

            post.comments.unshift(newComment);
            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.catch = err;
                return res.status(400).json(errors);
              });
          })
          .catch(err => {
            errors.catch = err;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        return res.status(400).json(errors);
      });
  }
);

// @route   DELETE api/posts/:id/comment/:comment_id
// @desc    Delete comment to post by id
// @access  Private
router.delete(
  "/:id/comment/:comment_id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }

        Post.findById(req.params.id)
          .then(post => {
            if (!post) {
              errors.nopost = "Post not found by id";
              return res.status(400).json(errors);
            }
            if (
              post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
              ).length === 0
            ) {
              errors.commentnotfound = "Comment not found by id";
              return res.status(400).json(errors);
            }

            const removeIndex = post.comments
              .map(comment => comment._id.toString())
              .indexOf(req.params.comment_id);
            post.comments.splice(removeIndex, 1);

            post
              .save()
              .then(post => res.json(post))
              .catch(err => {
                errors.catch = err;
                return res.status(400).json(errors);
              });
          })
          .catch(err => {
            errors.catch = err;
            errors.catchPostFind = true;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        return res.status(400).json(errors);
      });
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};
    Profile.findOne({
        user: req.user.id
      })
      .then(profile => {
        if (!profile) {
          errors = "Profile not found";
          res.json(400).json(errors);
        }
        Post.findByIdAndDelete(req.params.id)
          .then(post => {
            if (!post) {
              errors.postnotexist = "Post not exist";
              return res.status(400).json(errors);
            }
            res.json({
              success: true
            });
          })
          .catch(err => {
            errors.catch = err;
            return res.status(400).json(errors);
          });
      })
      .catch(err => {
        errors.catch = err;
        return res.status(400).json(errors);
      });
  }
);

module.exports = router;