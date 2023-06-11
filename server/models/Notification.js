const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    username: { type: String, required: true },
    photo: { type: String, required: true },
    title: { type: String, required: true },
    senderid: { type: String, required: true },
    receiverid: { type: String, required: true },
    userphoto: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
