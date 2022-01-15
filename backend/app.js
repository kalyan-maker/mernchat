const express = require("express");
const path = require("path");
const cors = require("cors");

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const app = express();

app.use(express.json());

//routes
const userRoute = require("./routes/User");
const teamRoute = require("./routes/Team");
const chatRoute = require("./routes/Chat");

// middleware setup
// Cross Origin Resource Sharing Setup
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/team", teamRoute);
app.use("/api/chat", chatRoute);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Default API Route.",
  });
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
