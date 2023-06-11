const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    photo: { type: String, required: true },
    userid: { type: String, required: true },
    username: { type: String, required: true },
    userphoto: { type: String, required: true },
    category: { type: String, required: true },
    likes: { type: [String], default: [] }, // Array of userId values
    likesCounter: { type: Number, default: 0 },
    comments: { type: [Schema.Types.Mixed], default: [] }, // Array of comment objects
    commentsCounter: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
