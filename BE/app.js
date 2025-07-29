const express = require("express");
const app = express();

const bodyparser = require("body-parser");
// Environment file set
const dotnet = require("dotenv");
dotnet.config({ path: "./config/config.env" });

app.use(express.json({ limit: "8mb" }));
let cookieParser = require("cookie-parser");
app.use(cookieParser());
//

const cron = require("node-cron");
let ALLOWED_ORIGINS = [
  "https://fintcx.com",
  "https://www.fintcx.com",
  "https://fintcx-two.vercel.app",
  "https://www.fintcx-two.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];
app.use((req, res, next) => {
  let origin = req.headers.origin;
  let theOrigin =
    ALLOWED_ORIGINS.indexOf(origin) >= 0 ? origin : ALLOWED_ORIGINS[0];
  res.header("Access-Control-Allow-Origin", theOrigin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header("Access-Control-Allow-Credentials", true);

  res.header(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, PATCH,DELETE, OPTIONS"
  );
  next();
});
cron.schedule("*/10 * * * *", () => {
  try {
    // Your code to be executed every 15 minutes
    console.log("Cron job executed every 15 minutes");
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
//
// app.use(
//   cors({
//     origin: process.env.CORS,

//     credentials: true,
//     exposedHeaders: ["Set-Cookie"],
//   })
// );
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
// All Routes
const coins = require("./routes/coinRoute");
const user = require("./routes/userRoute");
const file = require("./routes/fileRoute");
app.use("/api/v1", coins);
app.use("/api/v1", user);
app.use("/api/v1", file);

module.exports = app;
