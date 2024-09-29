import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "./config/db.js";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
