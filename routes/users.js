const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

module.exports = app => {
  app.post("/users", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("That user already exists!");
    } else {
      user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = jwt.sign({ _id: user._id }, keys.jwtKey, {
        expiresIn: "1h"
      });
      res.send({ user, token: { token, expiresIn: 60 * 60 * 1000 } });
    }
  });
};
