import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    interviewer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interviewer",
        required: true,
    },
    jobseeker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "JobSeeker",
        required: true,
    },
    interview_date: {
        type: Date,
        required: true,
    },
    status: {
        type : String,
        enum: ["scheduled", "completed", "cancelled"],
        default: "scheduled",        
    },
    start_url : {
        type : String,
        default : ""
    }
},{timestamps:true});

const Interview = mongoose.model("Interview", interviewSchema);
export default Interview;