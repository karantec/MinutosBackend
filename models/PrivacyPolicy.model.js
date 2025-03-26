const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
  {
    
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Stores createdAt & updatedAt
);

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
