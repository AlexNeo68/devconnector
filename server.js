const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(passport.initialize());
require("./config/passport")(passport);

const db = require("./config/key").mongoURI;
mongoose
  .connect(
    db, {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Mongo connected...");
  })
  .catch(err => {
    throw err;
  });

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});