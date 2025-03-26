const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["privacy_policy", "terms_conditions"], // Two types only
      required: true,
      unique: true, // Ensures only one of each type exists
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Stores createdAt & updatedAt
);

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
