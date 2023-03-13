require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/DB");
const authRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");
const cookieParser = require("cookie-parser");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
// routes
app.use("/api/auth", authRoute);
app.use("/comment", commentRoute);
app.use(cookieParser());
connectDB();
app.listen(5000, () => console.log("sever is running ....."));

process.on("unhandledRejection", (error) => console.log(error.meassage));
