import mongoose from "mongoose";

const companySchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    description: {
        type: String
    },
    location: {
        type: String
    },
    jobs_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    logo: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    contact_no: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"]
    }
},{timestamps:true})

const Company = mongoose.model("Company", companySchema);
export default Company;