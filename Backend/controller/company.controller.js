import bcryptjs from 'bcryptjs';
import Company from "../model/Company.model.js";
import Job from '../model/Job.modem.js';

export const register = async (req, res) => {
    const { name, email, password, contact_no } = req.body;
    console.log(name, email, password, contact_no);

    if (!name || !email || !password || !contact_no) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const phoneRegex = /^[0-9]{10,15}$/;
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
