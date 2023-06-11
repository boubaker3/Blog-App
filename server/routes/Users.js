require("dotenv").config();
const multer = require("multer");
const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const savingDate = Date.now();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, savingDate + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare the provided password with the stored password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  // Create and sign the JWT token
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN);

  res.json({ token, user });
});

router.route("/signup").post(upload.single("photo"), async (req, res) => {
  const { username, email, password } = req.body;
  const photoPath = savingDate + "-" + req.file.originalname;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userData = {
    username,
    email,
    password: hashedPassword,
    photo: photoPath,
  };

  const user = new User(userData);
  registredUser = { email, password };
  user
    .save()
    .then(() => {
      const token = jwt.sign({ registredUser }, process.env.ACCESS_TOKEN);
      res.json({ token, user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
