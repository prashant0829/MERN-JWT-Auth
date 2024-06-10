const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const errorHandler = require("./middlewares/ErrorHandler");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const logsDirectory = path.join(__dirname, "logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create a writable stream to append log messages to a file
const logStream = fs.createWriteStream(path.join(logsDirectory, "app.log"), {
  flags: "a",
});

// Custom middleware to log requests
app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${
    req.originalUrl
  } - ${req.ip}\n`;
  logStream.write(logMessage);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Use the error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
