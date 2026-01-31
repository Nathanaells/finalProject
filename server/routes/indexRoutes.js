const router = require("express").Router();
const errorHandler = require("../middlewares/errorHandler");
const userRoutes = require("./userRoutes");
const mainRoutes = require("./mainRoutes");

router.get("/", (req, res) => {
  res.send("API is working");
});
router.use("/users", userRoutes);
router.use("/main", mainRoutes);

router.use(errorHandler);

module.exports = router;
