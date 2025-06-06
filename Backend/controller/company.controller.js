import bcryptjs from 'bcryptjs';
import Company from "../model/Company.model.js";
import Job from '../model/Job.modem.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import Application from '../model/Application.model.js';

export const register = async (req, res) => {
    const { name, email, password, contact_no } = req.body;
    console.log(name, email, password, contact_no);

    if (!name || !email || !password || !contact_no) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(contact_no)) {
        return res.status(400).json({ message: "Please enter a valid phone number." });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
        });
    }

    try {
        const existedCompany = await Company.findOne({ email });
        if (existedCompany) {
            return res.status(400).json({ message: "Company with this email already exists." });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const newCompany = new Company({
            name,
            password: hashedPassword,
            email,
            contact_no
        });

        await newCompany.save();

        return res.status(201).json({ message: "Company created successfully." });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};


export const updateCompany = async (req, res) => {
    const { name, email, website, location, description, industry_type, contact_no, AllLinks } = req.body;
    const company_id = req.user?.id;
    let logoUrl = null;

    if (!company_id) {
        return res.status(401).json({
            message: "Unauthorized actions.",
            status: 401,
            success: false
        });
    }

    try {
        // Validate required fields
        const requiredFields = [name, email, contact_no, website, location, industry_type];
        // if (requiredFields.some(field => !field)) {
        //     return res.status(400).json({
        //         message: "All fields are required.",
        //         status: 400,
        //         success: false
        //     });
        // }

        // Validate phone number format
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(contact_no)) {
            return res.status(400).json({
                message: "Please enter a valid phone number.",
                status: 400,
                success: false
            });
        }

        // Check if company exists
        const existedCompany = await Company.findById(company_id);
        if (!existedCompany) {
            return res.status(404).json({
                message: "Company not found.",
                status: 404,
                success: false
            });
        }

        // Check for duplicate email (excluding current company)
        const existingEmailUser = await Company.findOne({ email, _id: { $ne: company_id } });
        if (existingEmailUser) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
                status: 400
            });
        }

        // Check for duplicate contact number (excluding current company)
        const existingPhoneUser = await Company.findOne({ contact_no, _id: { $ne: company_id } });
        if (existingPhoneUser) {
            return res.status(400).json({
                message: "Contact number already exists",
                success: false,
                status: 400
            });
        }

        // Handle logo upload (optional)
        if (req.files?.profilePicture) {
            const fileType = req.files.profilePicture[0].mimetype === "application/pdf" ? "raw" : "image";
            const localPath = req.files.profilePicture[0].path;
            const uploadResponse = await uploadOnCloudinary(localPath, fileType);
            logoUrl = uploadResponse?.secure_url || null;
        }

        // Update company details
        const updatedCompany = await Company.findByIdAndUpdate(
            company_id,
            {
                name,
                email,
                website,
                location,
                description: description || existedCompany.description,
                industry_type,
                contact_no,
                logo: logoUrl || existedCompany.logo,
                AllLinks: AllLinks || []
            },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
                status: 404
            });
        }

        const updatedCompanyObj = updatedCompany.toObject();
        updatedCompanyObj.role = "company";

        return res.status(200).json({
            message: "Company updated successfully",
            success: true,
            status: 200,
            data: updatedCompanyObj
        });

    } catch (error) {
        console.error("Error while updating the company:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            status: 500
        });
    }
};

export const createJob = async (req, res) => {
    const { title, description, location, salary_expected, experience, job_type, skills_required } = req.body;
    const company_id = req.user?.id;

    if (!company_id) {
        return res.status(403).json({ message: "Unauthorized. Only companies can post jobs." });
    }

    if (!title || !description || !location || !salary_expected || !experience || !job_type) {
        return res.status(400).json({ message: "All fields are required, and skills_required must be an array." });
    }

    const existingCompany = await Company.findById(company_id);
    if (!existingCompany) {
        return res.status(404).json({ message: "Company not found. Please register first." });
    }

    try {
        const newJob = new Job({
            title,
            description,
            company_id,
            location,
            salary_expected,
            experience,
            job_type,
            skills_required
        });

        await newJob.save();

        return res.status(201).json({
            message: "Job posted successfully!",
            job: newJob
        });

    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

export const getMyJob = async (req, res) => {
    const { id } = req.params;
    try {
        const myJob = await Job.find({ company_id: id });

        if (myJob.length === 0) {
            return res.status(404).json({ message: "No jobs found for this company." });
        }

        return res.status(200).json(myJob);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
};

export const getApplicantsForJob = async (req, res) => {
    const { id } = req.params;

    try {
        const applications = await Application.find({ job_id: id })
        .populate({
            path: "applicant_id",
            select: "name email profilePicture resumeUrl contact_no experience"
        })
        .select("status resume createdAt")
        .sort({ createdAt: -1 }); // Sort by newest applications first
        
        console.log('applications: ', applications);
        if (!applications.length) {
            return res.status(404).json({ message: "No applications found for this job." });
        }

        // Format the response more safely with null checks
        const formattedApplicants = applications.map(app => ({
            applicationId: app._id, // Include application ID for reference
            name: app.applicant_id?.name || "Not available",
            email: app.applicant_id?.email || "Not available",
            profilePicture: app.applicant_id?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            resume: app.resume || app.applicant_id?.resumeUrl || "No resume available",
            contact_no: app.applicant_id?.contact_no || "Not provided",
            experience: app.applicant_id?.experience || "Not specified",
            status: app.status,
            appliedAt: app.createdAt
        }));

        res.status(200).json({
            count: formattedApplicants.length,
            applicants: formattedApplicants
        });
    } catch (error) {
        console.error("Error fetching job applicants:", error);
        res.status(500).json({
            message: "Internal server error.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const changeStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
        
    // Validate if the provided status is allowed
    const allowedStatuses = ["applied", "shortlisted", "interview", "rejected","hired"];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status value provided." });
    }

    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ message: "Application not found." });
        }

        res.status(200).json({ 
            message: `Application status updated to ${status}.`,
            application: updatedApplication
        });
    } catch (error) {
        console.error("Error updating application status:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
