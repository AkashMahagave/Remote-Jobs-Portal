/**
 * Auth Controller
 * This file contains the logic for handling user authentication:
 * Registration, Login, Logout, and getting User details.
 */
const User = require("../models/User");
const jwt = require("jsonwebtoken");

/**
 * sendTokenResponse
 * Helper function to create a JSON Web Token (JWT) and send it as a Cookie.
 * This keeps the user logged in.
 */
const sendTokenResponse = (user, statusCode, res) => {
  // Create token using the User's ID and a secret key
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set cookie options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true, // Prevents client-side scripts from accessing the cookie
  };

  // Send response with the token and user data
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
    },
  });
};

/**
 * register
 * Creates a new user in the database.
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    // 1. Check if user already exists by email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists with this email" });
    }

    // 2. Check if phone is provided and already taken
    if (phone) {
      const phoneExists = await User.findOne({ phone });
      if (phoneExists) {
        return res.status(400).json({ success: false, message: "Phone number is already registered" });
      }
    }

    // 3. Create the user
    const userData = { name, email, password, role };
    if (phone) userData.phone = phone;

    const user = await User.create(userData);

    // 4. Send back the token to log them in automatically
    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * login
 * Authenticates an existing user using email or phone number.
 */
exports.login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // 1. Check if credentials are provided
    if ((!email && !phone) || !password) {
      return res.status(400).json({ success: false, message: "Please provide email/phone and password" });
    }

    // 2. Find user by email or phone and include the password field (hidden by default)
    let user;
    if (email) {
      user = await User.findOne({ email }).select("+password");
    } else if (phone) {
      user = await User.findOne({ phone }).select("+password");
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 3. Check if the password matches the hashed password in the DB
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // 4. Send back the token
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

/**
 * logout
 * Clears the auth cookie to log the user out.
 */
exports.logout = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

/**
 * getMe
 * Returns the profile of the currently logged-in user.
 */
exports.getMe = async (req, res) => {
  try {
    // req.user.id comes from the authentication middleware
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
