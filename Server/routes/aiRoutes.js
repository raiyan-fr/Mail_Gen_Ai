const express = require("express");
const router = express.Router();
const aiController = require("../controllers/ai-controller");
const authMiddleware = require("../middleware/authMiddleware");

// generate cold email
router.post("/generate-email", authMiddleware, aiController.generateEmail);

// get email history
router.get("/email-history", authMiddleware, aiController.emailHistory);

module.exports = router;
