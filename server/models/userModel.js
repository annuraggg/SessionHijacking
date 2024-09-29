import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["Debit", "Credit"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  accountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Savings", "Current", "Fixed Deposit"], // Define allowed account types
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  branch: {
    branchName: {
      type: String,
      required: true,
    },
    branchCode: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  contact: {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      required: true,
      match: /^\+91-\d{10}$/,
    },
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Closed"],
    default: "Active",
  },
  activeSessions: { type: [String] },
  transactions: [transactionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
export default User;
