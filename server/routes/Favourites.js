const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Article = require("../models/Article");

router.route("/favourites").get(authenticateToken, (req, res) => {
  const { userid, category, search } = req.query;
  let query = {};

  // Check if userid is provided
  if (userid) {
    query.likes = { $in: [userid] };
  }

  // Check if category is provided
  if (category) {
    query.category = category;
  }

  // Check if search is provided
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  Article.find(query)
    .then((favorites) => res.json(favorites))
    .catch((err) => res.status(400).json("Error: " + err));
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.send("token is undefined");
  }
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
module.exports = router;
