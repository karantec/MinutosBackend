const express = require("express");
const { createOrUpdateTerms, getTerms, deleteTerms } = require("../controller/TermsandController");
const router = express.Router();

// Route to create or update Terms & Conditions
router.post("/createTerms", createOrUpdateTerms);

// Route to get the latest Terms & Conditions
router.get("/terms", getTerms);

// Route to get all Terms & Conditions entries

// Route to delete Terms & Conditions
router.delete("/terms", deleteTerms);

module.exports = router;
