const router = require("express").Router();
const Article = require("../models/Article");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Notification = require("../models/Notification");
const User = require("../models/User");
require("dotenv").config();
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const savingDate = Date.now();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, savingDate + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/").get(authenticateToken, cors(corsOptions), (req, res) => {
  const { userid, category, search } = req.query;
  let query = {};

  // Check if userid is provided
  if (userid) {
    query.userid = userid;
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
    .then((articles) => res.json(articles))
    .catch((err) => res.status(400).json("Error: " + err));
});

router
  .route("/notifications/:id")
  .get(authenticateToken, cors(corsOptions), (req, res) => {
    const userid = req.params.id;

    Notification.find({ receiverid: userid })
      .then((notifications) => res.json(notifications))
      .catch((err) => res.status(400).json("Error: " + err));
  });


router
  .route("/add")
  .post(authenticateToken, upload.single("photo"), (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const photo = savingDate + "-" + req.file.originalname;
    const userid = req.body.userid;
    const username = req.body.username;
    const userphoto = req.body.userphoto;
    const category = req.body.category;

    const newArticle = new Article({
      title,
      content,
      photo,
      userid,
      username,
      userphoto,
      category,
    });

    newArticle
      .save()
      .then(() => res.json("New Article added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

router.route("/delete/:id").delete(authenticateToken, (req, res) => {
  Article.deleteOne({ _id: req.params.id })
    .then(() => res.json("Your Article was deleted!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/edit/:id").put(authenticateToken, (req, res) => {
  Article.updateOne(
    { _id: req.params.id },
    { $set: { title: req.body.title, content: req.body.content } }
  )
    .then(() => res.json("Your Article was updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/like/:id").post(authenticateToken, async (req, res) => {
  const articleId = req.params.id;
  const userId = req.body.userId;

  try {
    // Check if the user has already liked the article
    const article = await Article.findById(articleId);
    const user = await User.findById(userId);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const isLiked = article.likes.includes(userId);

    // Update the article based on whether the user has liked it or not
    if (isLiked) {
      const update = {
        $pull: { likes: userId }, // Remove userId from likes array
        $inc: { likesCounter: -1 }, // Decrement likesCounter by 1
      };

      // Update the article using updateOne
      await Article.updateOne({ _id: articleId }, update);
    } else {
      const update = {
        $addToSet: { likes: userId }, // Add userId to likes array
        $inc: { likesCounter: 1 }, // Increment likesCounter by 1
      };
      await Article.updateOne({ _id: articleId }, update);
      const notification = new Notification({
        title: article.title,
        senderid: user._id,
        username: user.username,
        photo: article.photo,
        userphoto: user.photo,
        receiverid: article.userid,
        type: "like",
      });
      notification.save();
    }

    res.json({ message: "Like updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/comments/:id/", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { comment, userid, username, photo } = req.body;

  try {
    const article = await Article.findById(id);
    const user = await User.findById(userid);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const newComment = {
      comment,
      userid,
      username,
      photo,
    };

    article.comments.push(newComment);
    article.commentsCounter++;

    const savedArticle = await article.save();
    const notification = new Notification({
      title: article.title,
      senderid: user._id,
      username: user.username,
      photo: article.photo,
      userphoto: user.photo,
      receiverid: article.userid,
      type: "comment",
    });
    notification.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error("Failed to add comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// GET request to fetch comments for an article
router.get("/comments/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    const comments = article.comments;

    res.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
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
