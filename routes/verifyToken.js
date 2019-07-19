const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const bearer = token.split(" ");
    const verified = jwt.verify(bearer[1], keys.jwtKey);
    req.user = verified;
    next()
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

module.exports = { verifyToken };
