const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const boardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
); // Add timestamps option to automatically handle createdAt and updatedAt

module.exports = mongoose.model("Board", boardSchema);
