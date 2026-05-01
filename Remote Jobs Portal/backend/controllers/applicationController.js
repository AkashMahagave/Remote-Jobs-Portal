const Application = require("../models/Application");
const Job = require("../models/Job");
const path = require("path");
const fs = require("fs");

// @desc    Apply for a job
// @route   POST /api/applications/:jobId/apply
// @access  Private (Jobseeker)
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter } = req.body;
    
    // Check if resume file was uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a resume" });
    }
    
    const resumeLink = `/uploads/${req.file.filename}`;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if user already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id,
    });

    if (existingApplication) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }

    const application = await Application.create({
      job: jobId,
      applicant: req.user._id,
      resumeLink,
      coverLetter,
    });

    res.status(201).json({ success: true, data: application });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "You have already applied for this job." });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get my applications
// @route   GET /api/applications/my-applications
// @access  Private (Jobseeker)
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id }).populate("job");

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Verify employer is the owner
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized to view these applications" });
    }

    const applications = await Application.find({ job: jobId }).populate("applicant", "name email");

    res.status(200).json({ success: true, count: applications.length, data: applications });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Withdraw an application
// @route   DELETE /api/applications/:id
// @access  Private (Jobseeker)
exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // Verify jobseeker is the owner
    if (application.applicant.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized to withdraw this application" });
    }

    // Delete the file from server if it exists
    if (application.resumeLink) {
      const filename = application.resumeLink.split("/").pop();
      const filePath = path.join(__dirname, "..", "uploads", filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await application.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get resume file (Securely)
// @route   GET /api/applications/resume/:filename
// @access  Private
exports.getResume = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, "..", "uploads", filename);

    // 1. Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "Resume not found" });
    }

    // 2. Find application associated with this resume to check authorization
    const application = await Application.findOne({ resumeLink: `/uploads/${filename}` }).populate("job");

    if (!application) {
      return res.status(404).json({ success: false, message: "No application found for this resume" });
    }

    // 3. Authorization Check:
    // User can view if they are the applicant OR the employer who posted the job
    const isApplicant = application.applicant.toString() === req.user._id.toString();
    const isEmployer = application.job && application.job.postedBy && application.job.postedBy.toString() === req.user._id.toString();

    if (!isApplicant && !isEmployer) {
      return res.status(401).json({ success: false, message: "Not authorized to view this resume" });
    }

    // 4. Determine Content-Type based on extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".pdf") contentType = "application/pdf";
    else if (ext === ".doc") contentType = "application/msword";
    else if (ext === ".docx") contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    // 5. Send the file
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${filename}"`);
    res.sendFile(filePath);
  } catch (err) {
    res.status(500).json({ success: false, message: "Error retrieving resume" });
  }
};

