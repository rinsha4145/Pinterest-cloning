const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, maxlength: 200 },
    description: { type: String, maxlength: 500 },
    image: { type: String, required: true },
    link: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: { type: [String] },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    boardId: { type: Schema.Types.ObjectId, ref: "Board" },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        comment: { type: String, required: true },
        replies: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Users",
              required: true,
            },
            reply: { type: String, required: true },
            repliedAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],

    savesCount: { type: Number, default: 0 },
    viewsCount: { type: Number, default: 0 },

    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Users",
      },
    ],
    viewsCount: { type: Number, default: 0 },

    reports: [
      {
        reportedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
          required: true,
        },
        reason: { type: String, required: true },
        reportedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
