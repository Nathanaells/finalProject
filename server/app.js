// Declaration of dependencies and initial setup
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const mainRoutes = require("./routes/indexRoutes");
const errorHandler = require("./middlewares/errorHandler");

// Middleware configuration
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route configuration
app.use("/", mainRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
