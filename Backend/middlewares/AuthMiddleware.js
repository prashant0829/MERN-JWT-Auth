const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;
  //console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    const expTimestamp = 1717948405;
    const expirationDate = new Date(expTimestamp * 1000);
    const options = { timeZone: "Asia/Kolkata" }; // Setting timezone to IST

    console.log(expirationDate.toLocaleString("en-US", options));

    next();
  } catch (error) {
    res.status(401).json({ error: "Not authorized, token failed" });
  }
};

module.exports = { protect };
