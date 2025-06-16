const bcrypt = require("bcryptjs");
const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }
  const hashedPassword = await bcrypt.hashSync(password, 10);
  const newUser = new Auth({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ message: "user signup successfully", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error signup user", success: false, error });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email === "") {
    return res
      .status(400)
      .json({ message: "All field are required", success: false });
  }

  try {
    const validUser = await Auth.findOne({ email });
    if (!validUser) {
      res.status(404).json({ message: "user not found", success: false });
    }
    const validpassword = bcrypt.compareSync(password, validUser.password);
    if (!validpassword) {
      return res
        .status(401)
        .json({ message: "Invalid password", success: false });
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 36000000);
    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate });
    res.status(200).json({message: 'User signed in successfully',
        success: true,
        token,
        user: rest,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error signing in user", success: false, error });
  }
};

const updateAccount = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(403).json("You are not allowed to update this user");
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters");
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return res
        .status(400)
        .json("Username must be between 7 and 20 characters");
    }
    if (req.body.username.includes(" ")) {
      return res.status(400).json("Username cannot contain spaces");
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json("Username must be lowercase");
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res
        .status(400)
        .json("Username can only contain letters and numbers");
    }
  }

  try {
    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteAccount = async (req, res) => {
  if (req.user.id !== req.params.userId) {
    return res.status(401).json("You are not allowed to delete this user");
  }
  try {
    await Auth.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been deleted successfully");
  } catch (error) {
    res.status(500).json({ message: "error deleting user", error });
  }
};

const logOut = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "error logging out user", error });
  }
};

module.exports = { signUp, signIn, updateAccount, deleteAccount, logOut };
