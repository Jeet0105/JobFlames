import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    job_post_limit : {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    features: {
        type: [String], 
        default: []
    },
    backgroundImageUrl :{
        type : String
    }
},{
    timestamps: true
});

const Subscription = mongoose.model("Subscription", SubscriptionSchema);
export default Subscription;