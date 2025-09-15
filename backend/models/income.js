
import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  icon: { type: String },
  source: { type: String, required: true }, // e.g., Salary, Freelance, etc.
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;
