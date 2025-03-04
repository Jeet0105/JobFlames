import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary_expected: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    job_type: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        required: true
    },
    skills_required:[{
        type: String
    }]
},{timestamps:true});

const Job = mongoose.model("Job", jobSchema);
export default Job;
