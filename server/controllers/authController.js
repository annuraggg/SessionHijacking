import User from "../models/userModel.js";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password, sessionId } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      user.activeSessions.push(sessionId);
      await user.save();
      return res.json({ message: "Logged in successfully", user });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkSession = async (req, res) => {
  const { sessionId } = req.body;
  try {
    const user = await User.findOne({ activeSessions: sessionId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateContact = async (req, res) => {
  const { user } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: user.username },
      user
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { login, checkSession, updateContact };
