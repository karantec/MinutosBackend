const mongoose = require('mongoose');

const timingSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., "Monday"
  slots: [
    {
      start: { type: String, required: true }, // e.g., "9:00AM"
      end: { type: String, required: true }    // e.g., "2:00PM"
    }
  ]
});

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const vendorSchema = new mongoose.Schema({
  // Personal Details
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  // Business Details
  businessName: { type: String, required: true },
  businessType: { type: String, required: true },

  // Address
  houseNumberAndArea: { type: String, required: true },
  streetAddress: { type: String, required: true },
  landMark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },

  // Location (lat/lng can be captured from frontend map)
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: { type: [Number], default: [0, 0] } // [lng, lat]
  },

  // Images (store Cloudinary URLs or file paths)
  images: [String],

  // Products offered
  products: [{ type: String }],

  // Weekly Availability
  availability: [timingSchema],

  // Reviews
  reviews: [reviewSchema],

  // Award Nomination
  isNominatedForAward: { type: Boolean, default: false },

}, { timestamps: true });

vendorSchema.index({ location: '2dsphere' }); // For geospatial queries

module.exports = mongoose.model('Vendor', vendorSchema)