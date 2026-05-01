/**
 * Job Model
 * This file defines the structure of a 'Job' listing in our database.
 * It is needed to store details about the job openings posted by employers.
 */
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    // The title of the job (e.g., Software Engineer)
    title: {
      type: String,
      required: [true, "Please add a job title"],
      trim: true,
    },
    // Detailed description of the job responsibilities
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    // Physical location or 'Remote'
    location: {
      type: String,
      required: [true, "Please add a location (e.g., Remote, City)"],
    },
    // Employment type
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Freelance", "Temporary", "Internship", "Volunteer", "Government"],
      required: [true, "Please add a job type"],
    },
    // How the work is done (Onsite, Hybrid, or Remote)
    workMode: {
      type: String,
      enum: ["Onsite", "Hybrid", "Remote"],
      default: "Remote",
    },
    // Salary range as a string
    salary: {
      type: String,
      required: [true, "Please add a salary or range"],
    },
    // Used for filtering jobs by salary
    salaryBracket: {
      type: String,
      enum: ["0-5L", "5-10L", "10-20L", "20L+"],
      default: "0-5L"
    },
    // Required experience level
    experience: {
      type: String,
      enum: ["Fresher", "1-2 years", "3-5 years", "5+ years"],
      default: "Fresher"
    },
    // List of skills required
    skills: {
      type: [String],
      default: []
    },
    // Broad category like IT, Finance, etc.
    category: {
      type: String,
      default: "IT"
    },
    // Name of the company hiring
    companyName: {
      type: String,
      required: [true, "Please add a company name"],
    },
    // Link to the company's logo image
    companyLogo: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    // Reference to the User (Employer) who posted this job
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the specific Company
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true } // Keeps track of when the job was posted
);

module.exports = mongoose.model("Job", JobSchema);

