const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      default: function () {
        return this.email ? this.email.split("@")[0] : "";
      },
    },
    lastname: { type: String },
    profileimage: { type: String },
    about: { type: String, maxLength: 500 },
    pronounce: {
      type: String,
      enum: ["Mr", "Ms", "Mx", "Other"],
      default: "Other",
    },
    website: { type: String },
    username: {
      type: String,
      unique: true,
      default: function () {
        return this.email ? this.email.split("@")[0] : "";
      },
    },
    language: { type: String },
    gender: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    birthdate: { type: Date, default: null, required: true },
    countryCode: { type: String },
    phoneNumber: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    stateProvinceRegion: { type: String },
    postalCode: { type: String },
    country: { type: String },
    isBlocked: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    following: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
      default: [],
    },
    deletionScheduled: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
