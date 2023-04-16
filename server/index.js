// Requiring Express Module to create the server
require("dotenv").config();
require("colors").enable();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

// Middlewares to read the reqest body
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:8080",
    exposedHeaders: "auth",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false, limit: "1mb" }));
app.use(express.json({ limit: "1mb" }));

// Routes
const users = require("./routes/api/users");

app.use("/api/users", users);

// Handle production
if (process.env.NODE_ENV === "production") {
  // static folder
  app.use(express.static(__dirname + "/public/"));
  // handle spa
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Express Module to start listening to the Server
const port = 5000;
app.listen(port, () => console.log(`Server is running at Port ${port}`));
