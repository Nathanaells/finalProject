const router = require("express").Router();
const MainController = require("../controllers/mainController");
const { auth } = require("../middlewares/auth");

router.post("/chat", auth, MainController.chat);
router.get("/histories", auth, MainController.getHistories);

module.exports = router;
