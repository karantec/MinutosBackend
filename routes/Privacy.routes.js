const express = require("express");
const {createOrUpdatePolicy,getAllPolicies,deletePolicy}=require("../controller/Privacy.Controller");
const router = express.Router();

// Create or update a policy
router.post("/create", createOrUpdatePolicy);


// Get all policies
router.get("/all", getAllPolicies);

// Delete the policy
router.delete("/delete", deletePolicy);

module.exports = router;
