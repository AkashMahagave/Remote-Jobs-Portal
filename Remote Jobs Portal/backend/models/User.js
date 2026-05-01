/**
 * User Model
 * This file defines the structure of a 'User' in our database.
 * It is needed to store information about people who sign up (Job Seekers or Employers).
 */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    // The full name of the user
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    // Unique email address used for login
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    // Optional phone number for contact/login
    phone: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values while enforcing uniqueness for non-null
      match: [
        /^[+]?[\d\s()-]{7,15}$/,
        "Please add a valid phone number",
      ],
    },
    // Hashed password for security
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false, // Prevents password from being sent in API responses by default
    },
    // Role determines if the user is looking for a job or posting one
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' fields
);

// This function runs BEFORE a user is saved to the database.
// It 'hashes' (encrypts) the password so it's not stored in plain text.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// This method is used during login to check if the entered password matches the stored hash.
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);

