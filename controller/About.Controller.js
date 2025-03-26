const { cloudinary } = require("../config/cloudinary");
const About = require("../models/About.model");

// **Create a New About Section with Image Upload**
const createAbout = async (req, res) => {
    try {
      const { title, description, image,linkedin,facebook,Instagram,twitter,username,whatsapp } = req.body;
  
      // Check if the About section with the same title already exists
      const existingAbout = await About.findOne({ title });
  
      if (existingAbout) {
        return res.status(400).json({ message: "About section already exists" });
      }
  
      // Create a new About section
      const newAbout = new About({ title, description, image,linkedin,facebook,Instagram,twitter,username,whatsapp });
      await newAbout.save();
  
      res.status(201).json({ message: "About created successfully", about: newAbout });
    } catch (error) {
      console.error("Error in createAbout:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// **Get All About Sections**
const getAllAbout = async (req, res) => {
  try {
    const aboutSections = await About.find();

    if (!aboutSections.length) {
      return res.status(404).json({ message: "No About sections found" });
    }

    res.status(200).json(aboutSections);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Update About Section**
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, images } = req.body;

    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { title, description, images,linkedin,facebook,Instagram,twitter,username,whatsapp },
      { new: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json({ message: "About section updated successfully", about: updatedAbout });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// **Delete About Section**
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAbout = await About.findByIdAndDelete(id);

    if (!deletedAbout) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json({ message: "About section deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createAbout, getAllAbout, updateAbout, deleteAbout };