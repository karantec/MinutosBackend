const express = require("express");
const { createPortfolio, getAllPortFolio, getPortFolioById, updatePortfolio, deletePortfolio, getPortfolioItemsByCategory } = require("../controller/Portfolio.Controller");


const router = express.Router();

router.post("/create", createPortfolio);
router.get("/getPort", getAllPortFolio);
router.get("/:id", getPortFolioById);
router.put("/:id", updatePortfolio);
router.get("/category/:category", getPortfolioItemsByCategory);
router.delete("/:id", deletePortfolio);

module.exports = router;
