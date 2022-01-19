const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./db");
const userRoutes = require("./routes/userRoutes");
const formidable = require("express-formidable");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(cors());
app.use(formidable());
app.use(express.json());
app.use("/", userRoutes);
//Database Connection
mongoose
  .connect(dbConfig.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected with database");
  })
  .catch((err) => {
    console.log("Failed to connect with database");
  });
app.listen(port, () => {
  console.log(`Server is up at port : ${port}`);
});
