const Company = require("../models/Company");
const Job = require("../models/Job");

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort("name");
    
    // Enrich companies with job counts
    const enrichedCompanies = await Promise.all(
      companies.map(async (company) => {
        const jobCount = await Job.countDocuments({ company: company._id });
        return {
          ...company._doc,
          jobCount
        };
      })
    );

    res.status(200).json({ success: true, count: enrichedCompanies.length, data: enrichedCompanies });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Get single company
// @route   GET /api/companies/:id
// @access  Public
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    
    const jobs = await Job.find({ company: company._id });
    
    res.status(200).json({ success: true, data: { ...company._doc, jobs } });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
