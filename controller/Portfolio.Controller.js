const { cloudinary } = require("../config/cloudinary");
const Portfolio= require("../models/PortFolio.model");

// **Create a New Blog Post with Image Upload**
const createPortfolio = async (req, res) => {
  try {
    const { name, category,image,description } = req.body;

    // Check if a team member with the same name & position already exists
    const existingPortfolio = await Portfolio.findOne({ name });

    if (existingPortfolio) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Create new team member
    const newPortFolio = new Portfolio({name, category,image,description });
    await newPortFolio.save();

    res.status(201).json({ message: "product created successfully", product: newPortFolio });
  } catch (error) {
    console.error("Error in createTeam:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllPortFolio= async (req, res) => {
  try {
    const Products = await Portfolio.find();

    if (!Products.length) {
      return res.status(404).json({ message: "No Product posts found" });
    }

    res.status(200).json(Products);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getPortfolioItemsByCategory = async (req, res) => {
    try {
      const { category } = req.params; // Extract category from URL
  
      const portfolioItems = await Portfolio.find({ category });
  
      if (!portfolioItems.length) {
        return res.status(404).json({ message: "No portfolio items found for this category" });
      }
  
      res.status(200).json(portfolioItems);
    } catch (error) {
      console.error("Error fetching portfolio items by category:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
const getPortFolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Portfolio.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update Product**
const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, image, description } = req.body;

    let imageUrl = "";

    // Upload new image if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, { folder: "portfolio" });
      imageUrl = result.secure_url;
    }

    const updatedProduct = await Portfolio.findByIdAndUpdate(
      id,
      { name, category, image: imageUrl, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete a Product**
const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Portfolio.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = { createPortfolio, getAllPortFolio,getPortfolioItemsByCategory,getPortFolioById ,updatePortfolio,deletePortfolio };
