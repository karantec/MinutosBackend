const Policy = require("../models/PrivacyPolicy.model");

// **Create or Update Policy**
const createOrUpdatePolicy = async (req, res) => {
  try {
    const { content } = req.body;

    // Check if a policy already exists
    let policy = await Policy.findOne();

    if (policy) {
      policy.content = content;
      await policy.save();
      return res.status(200).json({ message: "Policy updated successfully", policy });
    }

    // Create a new policy if none exists
    policy = new Policy({ content });
    await policy.save();
    res.status(201).json({ message: "Policy created successfully", policy });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get the Policy**
const getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne();
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.status(200).json(policy);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Policies**
const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();

    if (policies.length === 0) {
      return res.status(404).json({ message: "No policies found" });
    }

    res.status(200).json({ message: "Policies retrieved successfully", policies });
  } catch (error) {
    console.error("Error retrieving policies:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete Policy**
const deletePolicy = async (req, res) => {
  try {
    const policy = await Policy.findOneAndDelete();
    if (!policy) {
      return res.status(404).json({ message: "No policy found to delete" });
    }

    res.status(200).json({ message: "Policy deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrUpdatePolicy,  getAllPolicies, deletePolicy };
