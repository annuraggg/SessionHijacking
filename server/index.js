import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// MongoDB setup (replace with your connection string)
mongoose
  .connect("mongodb://localhost:27017/sessionHijackDemo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// Session management (insecure setup for demo)
app.use(
  session({
    secret: "insecure-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      httpOnly: false, // Insecure for demo, but in production, you should set this to true
      secure: false, // Set this to false since we're not using HTTPS in localhost
    },
  })
);

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  await user.save();
  res.status(201).send({ message: "User registered!" });
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    req.session.userId = user._id;
    res.send({ message: "Logged in", sessionId: req.session.id });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Get session info (to demonstrate hijacking)
app.get("/session", (req, res) => {
  if (req.session.userId) {
    res.send({ message: "Session is active", sessionId: req.session.id });
  } else {
    res.status(401).send({ message: "No active session" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.send({ message: "Logged out" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
