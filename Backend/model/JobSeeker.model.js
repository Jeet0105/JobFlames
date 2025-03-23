import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"]
    },
    rating: { 
        type: Number, 
        min: 1, 
        max: 5, 
        default: 0 
    },
    profilePicture: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    contact_no: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"]
    },
    experience: {
        type: String,
        default: "0"
    },
    AllLinks : {
        type : [{
            LinkLabel : {
                type : String
            },
            link : {
                type : String
            }
        }]
    },
    resumeUrl : {
        type : String,
        default : "No Resume Url"
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true});

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema);
export default JobSeeker;