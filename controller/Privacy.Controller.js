const Policy = require("../models/PrivacyPolicy.mode");

// **Create or Update Privacy Policy / Terms**
const createOrUpdatePolicy = async (req, res) => {
  try {
    const { type, content } = req.body;

    // Validate type
    if (!["privacy_policy", "terms_conditions"].includes(type)) {
      return res.status(400).json({ message: "Invalid policy type" });
    }

    // Find existing policy by type
    let policy = await Policy.findOne({ type });

    if (policy) {
      // Update existing policy
      policy.content = content;
      await policy.save();
      return res.status(200).json({ message: "Policy updated successfully", policy });
    }

    // Create new policy
    policy = new Policy({ type, content });
    await policy.save();
    res.status(201).json({ message: "Policy created successfully", policy });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Policy by Type (Privacy Policy or Terms)**
const getPolicyByType = async (req, res) => {
  try {
    const { type } = req.params;

    const policy = await Policy.findOne({ type });
    if (!policy) {
      return res.status(404).json({ message: `${type} not found` });
    }

    res.status(200).json(policy);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPolicies = async (req, res) => {
    try {
      const policies = await Policy.find();
      res.status(200).json(policies);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
// **Delete Policy by Type**
const deletePolicyByType = async (req, res) => {
  try {
    const { type } = req.params;

    const policy = await Policy.findOneAndDelete({ type });
    if (!policy) {
      return res.status(404).json({ message: `${type} not found` });
    }

    res.status(200).json({ message: `${type} deleted successfully` });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrUpdatePolicy, getPolicyByType, getAllPolicies, deletePolicyByType };
