const express = require("express");
const router = express.Router();
const {validateToken} = require("../middlewares/AuthMiddleware");

// トークンを保持しているか確認
router.get("/", validateToken, (req, res) => {
  res.json({isInvalid: false});
});

module.exports = router;