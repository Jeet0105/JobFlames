import bcryptjs from 'bcryptjs';
import JobSeeker from '../model/JobSeeker.model.js';
import Job from '../model/Job.modem.js';
import Company from "../model/Company.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, contact_no } = req.body;

    if (!name || !email || !password || !contact_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(contact_no)) {
      return res.status(400).json({ message: "Please enter a valid phone number" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      });
    }

    const existingUser = await JobSeeker.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new JobSeeker({
      name,
      email,
      password: hashedPassword,
      contact_no
    });

    await newUser.save();

    return res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again later." });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('company_id', 'name');

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found." });
    }

    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};

export const getJobDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id)
      return res.status(400).json({ message: "Job ID is required" });
    
    // Fetch job details along with company information
    const job = await Job.findById(id).populate('company_id', 'name email website description location logo contact_no');

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job details:", error);
    return res.status(500).json({ message: "Internal server error. Please try again later." });
  }
};
