// middleware/errorHandler.js

const fs = require("fs");
const path = require("path");

const logsDirectory = path.join(__dirname, "../logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

// Create a writable stream to append error messages to a file
const errorLogStream = fs.createWriteStream(
  path.join(logsDirectory, "errors.log"),
  { flags: "a" }
);

const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error!";
  console.error(err.stack);
  errorLogStream.write(`${new Date().toISOString()} - ${err.stack}\n`);
  return res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorHandler;
