const express = require("express");
const { createOrUpdatePolicy, getPolicyByType, deletePolicyByType, getAllPolicies } = require("../controller/Privacy.Controller");

const router = express.Router();

router.post("/create", createOrUpdatePolicy); // Create or update policy
router.get("/:type", getPolicyByType); 
router.get("/get", getAllPolicies);// Get policy by type
router.delete("/:type", deletePolicyByType); // Delete policy by type

module.exports = router;
