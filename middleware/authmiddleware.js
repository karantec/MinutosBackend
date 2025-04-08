const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

// Basic token check + attach user to request
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Restrict to only vendor users
const vendorOnly = (req, res, next) => {
  if (req.user && req.user.role === "vendor") {
  next();
  } else {
    res.status(403).json({ message: "Access denied: Only vendors can perform this action" });
  }
};

module.exports = { protect, vendorOnly };
