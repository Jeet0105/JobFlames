import bcryptjs from 'bcryptjs';
import JobSeeker from '../model/JobSeeker.model.js';
import Job from '../model/Job.modem.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import Interviewer from '../model/Interviewer.model.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, contact_no } = req.body;

    if (!name || !email || !password || !contact_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
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

export const updateJobSeekers = async (req, res) => {
  try {
    const { _id, name, email, contact_no, experience, AllLinks } = req.body;
    let profilePictureUrl = null;
    let resumeUrl = null;

    if (!_id || !name || !email || !contact_no || !experience) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
        status: 400
      });
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(contact_no)) {
      return res.status(400).json({
        message: "Please enter a valid phone number",
        success: false,
        status: 400
      });
    }

    const existingUser = await JobSeeker.findOne({ email: email, _id: _id });
    if (!existingUser) {
      return res.status(400).json({
        message: "JobSeeker doesn't exists",
        success: false,
        status: 400
      });
    }

    const allEmails = await JobSeeker.find({ email: email });
    if (allEmails.length > 1) {
      allEmails.forEach((user) => {
        if (user._id !== existingUser._id) {
          return res.status(400).json({
            message: "Email already exists",
            success: false,
            status: 400
          });
        }
      })
    }

    const allContacts = await JobSeeker.find({ contact_no: contact_no });
    if (allContacts.length > 1) {
      allContacts.forEach((user) => {
        if (user._id !== existingUser._id) {
          return res.status(400).json({
            message: "Contact already exists",
            success: false,
            status: 400
          });
        }
      })
    }
    if (req.files?.profilePicture) {
      const fileType = req.files.profilePicture[0].mimetype === "application/pdf" ? "raw" : "image";
      const localPath = req.files.profilePicture[0].path;
      const uploadResponse = await uploadOnCloudinary(localPath, fileType);
      profilePictureUrl = uploadResponse?.secure_url || null;
    }

    console.log('req.files: ', req.files);

    if (req.files?.resumeUrl) {
      const fileType = req.files.resumeUrl[0].mimetype === "application/pdf" ? "raw" : "image"; // FIXED
      const localPath = req.files.resumeUrl[0].path;
      const uploadResponse = await uploadOnCloudinary(localPath, fileType);
      resumeUrl = uploadResponse?.secure_url || null;
    }


    const updatedJobSeeker = await JobSeeker.findOneAndUpdate({ _id: existingUser._id }, {
      name,
      email,
      contact_no,
      experience,
      profilePicture: profilePictureUrl ? profilePictureUrl : existingUser.profilePicture,
      resumeUrl: resumeUrl ? resumeUrl : existingUser.resumeUrl,
      AllLinks
    }, { new: true });

    if (!updatedJobSeeker) {
      return res.status(404).json({
        message: "JobSeeker Not found",
        success: false,
        status: 404
      })
    }

    // const newUser = { ...updatedJobSeeker, role: "jobseeker" }; 
    const updatedJobSeekers = updatedJobSeeker.toObject();
    updatedJobSeekers.role = "jobseeker";
    return res.status(200).json({
      message: "JobSeeker Updated SuccessFully..!",
      success: true,
      status: 200,
      data: updatedJobSeekers
    })
  } catch (error) {
    console.log("Error while updating JobSeeker : ", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      status: 500
    })
  }
}

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
    if (!id)
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

export const registerInterviewer = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await JobSeeker.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ message: "You are not authorized to register an interviewer" });
    }

    // Proceed to register the interviewer
    const { name, email, password, phone, specialization, experience, linkedInProfile } = req.body;

    // Check if interviewer already exists
    const existingInterviewer = await Interviewer.findOne({ email });
    if (existingInterviewer) {
      return res.status(400).json({ message: "Interviewer already registered with this email" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid phone number" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      });
    }

    // Create new interviewer
    const newInterviewer = new Interviewer({
      name,
      email,
      password:hashedPassword,
      phone,
      specialization,
      experience,
      linkedInProfile,
    });

    await newInterviewer.save();

    res.status(201).json({ message: "Interviewer registered successfully", interviewer: newInterviewer });
  } catch (error) {
    console.error("Error registering interviewer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
