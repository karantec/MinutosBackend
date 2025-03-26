const mongoose = require("mongoose");

const TermsSchema = new mongoose.Schema(
  {
    
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Stores createdAt & updatedAt
);

const Terms = mongoose.model("Terms", TermsSchema);
module.exports = Terms;
