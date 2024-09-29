import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/sessionHijackDemo")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));
