require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/DB");
const authRoute = require("./routes/authRoute");
const commentRoute = require("./routes/commentRoute");
const cookieParser = require("cookie-parser");
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
// routes
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/comment", commentRoute);

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on("unhandledRejection", (error) => console.log(error.meassage));
