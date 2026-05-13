const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a company name"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    logo: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    category: {
      type: String,
      default: "General",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);
