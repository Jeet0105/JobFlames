import mongoose from "mongoose";

const interviewerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profilePicture : {
      type : String,
      default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
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
    rating: {
      type: Number,
      min: [0, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 0,
    },
    linkedInProfile: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

const Interviewer = mongoose.model("Interviewer", interviewerSchema);
export default Interviewer;
