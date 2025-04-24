const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const sendMail = require("../helpers/sendMail");
const registerEmail = require("../helpers/registerEmail").registerEmail;

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();

    await sendMail(
      email,
      "Welcome to Mark Online 🎉",
      `Hi ${name}, Welcome to Mark Online!`,
      registerEmail(name)
    );

    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", { email, password });

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Incorrect Email Or Password",
        success: false,
      });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Incorrect Email Or Password",
        success: false,
      });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful!",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
