const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./Routes/AuthRouter");
const studentRouter = require("./Routes/StudentRouter");
const attendanceRoutes = require("./Routes/attendance");

require("dotenv").config();
require("./Models/db");
const PORT = process.env.PORT || 5000;

app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/api/students", studentRouter);
app.use("/api/attendance", attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
