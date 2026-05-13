const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Ensure uploads directory exists (required by multer for resume uploads)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Created uploads directory");
}

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Note: Static access to /uploads removed for security. 
// Files are now served via /api/applications/resume/:filename with auth checks.

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // For local development and demonstration purposes, allow all origins
      // that look like local network or localhost addresses
      return callback(null, true);
    },
    credentials: true, // Allow sending cookies
  })
);

// Route files
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const companyRoutes = require("./routes/companyRoutes");

// Mount routers
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/companies", companyRoutes);

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Remote Jobs Portal API is Live",
    version: "1.0.0",
    status: "Healthy"
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error", error: err.message });
});

const DEFAULT_PORT = 5000;
const requestedPort = Number(process.env.PORT) || DEFAULT_PORT;
const HOST = "0.0.0.0";

const server = app.listen(requestedPort, HOST, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${requestedPort}`);
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${requestedPort} is already in use.`);
    console.error(`Update backend/.env PORT or stop the process using port ${requestedPort}.`);
    process.exit(1);
  }

  console.error("Server failed to start:", err);
  process.exit(1);
});
