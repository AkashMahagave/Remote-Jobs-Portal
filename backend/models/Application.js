/**
 * Application Model
 * This file defines the structure of a 'Job Application'.
 * It is needed to track which user applied for which job.
 */
const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    // Reference to the Job being applied for
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    // Reference to the User (Job Seeker) who is applying
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Path or URL to the uploaded resume
    resumeLink: {
      type: String,
      required: [true, "Please provide a link to your resume"],
    },
    // Optional message from the applicant
    coverLetter: {
      type: String,
    },
    // Current status of the application
    status: {
      type: String,
      enum: ["Applied", "Under Review", "Accepted", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

// This ensures a user cannot apply for the same job more than once.
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model("Application", ApplicationSchema);

