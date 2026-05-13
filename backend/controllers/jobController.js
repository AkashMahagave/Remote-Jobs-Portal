/**
 * Job Controller
 * This file handles all operations related to job listings:
 * Listing all jobs, getting a single job, creating, updating, and deleting jobs.
 */
const Job = require("../models/Job");

/**
 * getJobs
 * Retrieves a list of jobs from the database with optional filters (search, location, workMode, etc.).
 */
exports.getJobs = async (req, res) => {
  try {
    const matchObj = {};
    if (req.query.workMode) matchObj.workMode = req.query.workMode;
    if (req.query.type) matchObj.type = req.query.type;
    if (req.query.experience) matchObj.experience = req.query.experience;
    if (req.query.salaryBracket) matchObj.salaryBracket = req.query.salaryBracket;
    if (req.query.category) matchObj.category = req.query.category;
    
    if (req.query.companyId) matchObj.company = req.query.companyId;
    if (req.query.company) matchObj.companyName = req.query.company;

    const andConditions = [];

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      andConditions.push({
        $or: [
          { title: searchRegex },
          { companyName: searchRegex },
          { location: searchRegex },
          { category: searchRegex },
          { description: searchRegex }
        ]
      });
    }
    
    if (req.query.location) {
      const locRegex = new RegExp(req.query.location, "i");
      andConditions.push({ location: locRegex });
    }

    const filter = { ...matchObj };
    if (andConditions.length > 0) {
      filter.$and = andConditions;
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .populate({ path: "postedBy", select: "name email" })
      .populate("company")
      .sort("-createdAt")
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({ success: true, count: total, data: jobs });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * getJob
 * Gets details for a specific job using its ID.
 */
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate({
      path: "postedBy",
      select: "name email",
    });

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * createJob
 * Allows an Employer to post a new job.
 */
exports.createJob = async (req, res) => {
  try {
    // We attach the ID of the logged-in user to the job listing
    req.body.postedBy = req.user.id;

    const job = await Job.create(req.body);

    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * updateJob
 * Allows an Employer to edit their own job listing.
 */
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Security check: Only the owner can edit the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized to update this job" });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: job });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * deleteJob
 * Allows an Employer to remove their own job listing.
 */
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Security check: Only the owner can delete the job
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ success: false, message: "Not authorized to delete this job" });
    }

    await job.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

