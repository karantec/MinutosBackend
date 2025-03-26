const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // Example: "Web Development"
  image: { type: String, required: true } ,
  description: { type: String, required: true },
  // Store Cloudinary or local image path
});

module.exports = mongoose.model("Portfolio", PortfolioSchema);
