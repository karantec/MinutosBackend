const express = require('express');
const router = express.Router();




const { protect, vendorOnly } = require('../middleware/authmiddleware');
const { getAllVendors, getVendorById, createVendor, updateVendor, deleteVendor } = require('../controller/Vendor.controller');

// 👇 Public route: Get all vendors (optionally filter by city)
router.get('/', getAllVendors);

// 👇 Public route: Get single vendor by ID
router.get('/:id', getVendorById);

// 👇 Vendor-only routes (must be authenticated as a vendor)
router.post('/', protect, vendorOnly, createVendor);
router.put('/:id', protect, vendorOnly, updateVendor);
router.delete('/:id', protect, vendorOnly, deleteVendor);

module.exports = router;
