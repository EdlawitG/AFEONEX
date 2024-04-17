const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const router = require("./routes/routes");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({origin:'http://localhost:3000',credentials:true}));
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.use(router);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log(`server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
