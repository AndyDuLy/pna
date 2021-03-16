const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// Register User Callback
const SIGNUP = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "User already exists" });

    const hashed_password = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashed_password,
      todos: [],
    });

    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// Login User Callback
const LOGIN = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });

    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        todos: user.todos,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// Current User Utility
const CURRENT_USER = async (req, res) => {
  try {
    const userID = req.query;

    await User.findOne({ _id : userID.userid }).then((currentUser) => {
      res.status(200).json({
        name: currentUser.name,
        userID: currentUser._id,
        todos: currentUser.todos
      });
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


// JWT Verifier
const VerifyJWT = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const jwtToken = req.headers.authorization;
      const verify = jwt.verify(jwtToken, process.env.JWT_SECRET);

      req.token = verify;
      next();
    } else return res.status(401).json({ message: "Unauthorized; invalid JWT." });
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong." });
  }
}


module.exports = { SIGNUP, LOGIN, CURRENT_USER, VerifyJWT }; 
