import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    applicant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
        required: true,
    },
    status: {
        type: String,
        enum: ["applied", "shortlisted", "interview", "hired", "rejected"],
        default: "applied",
    },
    resume: {
        type: String,
    }
},{timestamps:true});

const Application = mongoose.model("Application", applicationSchema);
export default Application;