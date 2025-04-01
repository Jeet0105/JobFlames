import JobSeeker from "../model/JobSeeker.model.js";
import Subscription from "../model/Subscription.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createSubscription = async (req, res) => {
    const { name, price, duration, job_post_limit, description, features } = req.body;
    const userId = req.user.id;
    console.log('req.user: ', req.user);
    let logoUrl = null;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized user action",
            status: 401,
            success: false
        })
    }

    try {

        const user = await JobSeeker.findById(userId);
        if (!user.isAdmin) {
            return res.status(402).json({
                message: "You cannot create subscription plan",
                status: 402,
                success: false
            })
        }

        if (!name || !price || !duration || !job_post_limit || !description || !features) {
            return res.status(400).json({
                message: "Please enter all fields",
                status: 400,
                success: false
            })
        }

        if (req.files?.profilePicture) {
            const fileType = req.files.profilePicture[0].mimetype === "application/pdf" ? "raw" : "image"; // FIXED
            const localPath = req.files.profilePicture[0].path;
            const uploadResponse = await uploadOnCloudinary(localPath, fileType);
            logoUrl = uploadResponse?.secure_url || null;
        }

        const ADDsubscription = await Subscription.create({
            name: name,
            price: price,
            duration: duration,
            job_post_limit: job_post_limit,
            description: description,
            features: features,
            backgroundImageUrl: logoUrl || ''
        })

        if (!ADDsubscription){
            return res.status(500).json({
                message: "Internal server error. Please try again later.",
                status: 500,
                success: false
            })
        }

        return res.status(200).json({
            message: "Subscription plan created successfully",
            status: 200,
            success: true,
            data: ADDsubscription
        });

    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            status : 500,
            success : false
        });
    }
}


export const getAllSubscription = async (req, res) => {
    try {
        const subscription = await Subscription.find({});

        if (!subscription || subscription.length < 1){
            return res.status(404).json({
                message : "Subscriptions not found",
                status : 404,
                success : false
            })
        }

        return res.status(200).json({
            message: "Subscription plan fetched successfully",
            status: 200,
            success: true,
            data: subscription
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            success: false
        });
    }
}