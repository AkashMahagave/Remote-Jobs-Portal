const express = require("express");
const { getCompanies, getCompany } = require("../controllers/companyController");

const router = express.Router();

router.route("/").get(getCompanies);
router.route("/:id").get(getCompany);

module.exports = router;
