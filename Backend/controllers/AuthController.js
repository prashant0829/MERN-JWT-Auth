const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const accessToken = generateToken(
      user._id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    const refreshToken = generateToken(
      user._id,
      process.env.JWT_REFRESH_SECRET,
      process.env.JWT_REFRESH_EXPIRES_IN
    );

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });

    res.status(200).json({
      user: { id: user._id, username: user.username },
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not found" });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) {
      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    const accessToken = generateToken(
      user.id,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRES_IN
    );
    res.status(200).json({ accessToken });
  });
};

exports.logout = (req, res, next) => {
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully" });
};
