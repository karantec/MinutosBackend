const Vendor = require('../models/Vendor.model');

// Create a new vendor (only for logged-in vendors)
exports.createVendor = async (req, res) => {
  try {
    // Check if vendor profile already exists for this user
    const existing = await Vendor.findOne({ user: req.user._id });
    if (existing) {
      return res.status(400).json({ message: 'Vendor profile already exists for this user' });
    }

    const vendor = new Vendor({
      ...req.body,
      user: req.user._id, // Automatically assign vendor user ID
    });

    const savedVendor = await vendor.save();
    res.status(201).json(savedVendor);
  } catch (error) {
    console.error('Error creating vendor:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get all vendors (optional: filter by city)
exports.getAllVendors = async (req, res) => {
  try {
    const query = {};
    if (req.query.city) {
      query['storeAddress.city'] = req.query.city;
    }

    const vendors = await Vendor.find(query);
    res.status(200).json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Get a single vendor by ID
exports.getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(vendor);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Update vendor by ID (only if the logged-in vendor owns it)
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    if (String(vendor.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only update your own vendor profile' });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Delete vendor by ID (only if the logged-in vendor owns it)
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    if (String(vendor.user) !== String(req.user._id)) {
      return res.status(403).json({ message: 'You can only delete your own vendor profile' });
    }

    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
};
