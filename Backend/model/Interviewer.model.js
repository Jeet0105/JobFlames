import mongoose from "mongoose";

const interviewerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    availability: [
      {
        day: { type: String, required: true },
        timeSlots: [{ type: String, required: true }],
      }
    ],
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    linkedInProfile: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(v);
        },
        message: "Invalid LinkedIn profile URL",
      },
      default: "",
    },
  },
  { timestamps: true }
);

const Interviewer = mongoose.model("Interviewer", interviewerSchema);
export default Interviewer;
