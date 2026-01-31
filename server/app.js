// Declaration of dependencies and initial setup
const express = require("express");
const app = express();
const cors = require("cors");
const mainRoutes = require("./routes/indexRoutes");

// Middleware configuration
require("dotenv").config();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route configuration
app.use("/", mainRoutes);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
