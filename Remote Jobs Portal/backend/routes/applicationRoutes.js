const express = require("express");
const { applyForJob, getMyApplications, getJobApplications, withdrawApplication, getResume } = require("../controllers/applicationController");
const { protect, authorize } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadsPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}

// Configure Multer with absolute path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.post("/:jobId/apply", protect, authorize("jobseeker"), upload.single("resume"), applyForJob);
router.get("/my-applications", protect, authorize("jobseeker"), getMyApplications);
router.get("/job/:jobId", protect, authorize("employer"), getJobApplications);
router.delete("/:id", protect, authorize("jobseeker"), withdrawApplication);
router.get("/resume/:filename", protect, getResume);

module.exports = router;
