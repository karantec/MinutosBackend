const Terms = require("../models/TermsandCondition.model");

// **Create or Update Terms & Conditions**
const createOrUpdateTerms = async (req, res) => {
  try {
    const { content } = req.body;

    // Check if a Terms & Conditions entry already exists
    let terms = await Terms.findOne();

    if (terms) {
      terms.content = content;
      await terms.save();
      return res.status(200).json({ message: "Terms & Conditions updated successfully", terms });
    }

    // Create a new entry if none exists
    terms = new Terms({ content });
    await terms.save();
    res.status(201).json({ message: "Terms & Conditions created successfully", terms });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get Terms & Conditions**
const getTerms = async (req, res) => {
  try {
    const terms = await Terms.findOne();
    if (!terms) {
      return res.status(404).json({ message: "Terms & Conditions not found" });
    }

    res.status(200).json(terms);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Get All Terms & Conditions Entries**
const getAllTerms = async (req, res) => {
  try {
    const termsList = await Terms.find();

    if (termsList.length === 0) {
      return res.status(404).json({ message: "No Terms & Conditions found" });
    }

    res.status(200).json({ message: "Terms & Conditions retrieved successfully", termsList });
  } catch (error) {
    console.error("Error retrieving Terms & Conditions:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete Terms & Conditions**
const deleteTerms = async (req, res) => {
  try {
    const terms = await Terms.findOneAndDelete();
    if (!terms) {
      return res.status(404).json({ message: "No Terms & Conditions found to delete" });
    }

    res.status(200).json({ message: "Terms & Conditions deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createOrUpdateTerms, getTerms, getAllTerms, deleteTerms };
