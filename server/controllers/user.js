const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "6d" });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) return res.status(400).json({ msg: "The email already exists." });

    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password is at least 6 characters long." });

    // Password Encryption
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Users({
      name,
      email,
      password: passwordHash,
    });

    // Save userdata in mongodb
    await newUser.save().then((user) => {
      // Then create jsonwebtoken to authentication
      const accesstoken = generateAccessToken({ id: user._id });
      const refreshtoken = generateRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 6 * 24 * 60 * 60 * 1000, // 6d
      });

      res.status(201).json({ accesstoken });
    });
  } catch {
    return res.status(500).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const Matched = await bcrypt.compare(password, user.password);
    if (!Matched) return res.status(400).json({ msg: "Incorrect password." });

    // If login success , create access token and refresh token
    const accesstoken = generateAccessToken({ id: user._id });
    const refreshtoken = generateRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 6 * 24 * 60 * 60 * 1000, // 6d
    });

    res.json({ accesstoken, refreshtoken });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const refreshToken = (req, res) => {
  console.log(req.cookies);
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token)
      return res.status(400).json({ msg: "Please Login/Register" });

    jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login/Register" });

      const accesstoken = generateAccessToken({ id: user.id });

      res.json({ user, accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const addCart = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      {
        cart: req.body.cart,
      }
    );

    return res.json({ msg: "Added to cart" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  register,
  refreshToken,
  login,
  logout,
  getUserInfo,
  addCart,
};
