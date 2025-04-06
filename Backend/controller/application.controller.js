import JobSeeker from "../model/JobSeeker.model.js";
import Job from "../model/Job.modem.js";
import Application from "../model/Application.model.js";

export const apply = async (req, res) => {
    try {
        const { job_id } = req.params;
        const jobseeker_id = req.user.id;
        
        if (!job_id || !jobseeker_id) {
            return res.status(400).json({ message: "Job ID or Job Seeker ID are required" });
        }

        const job = await Job.findById(job_id);
        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        const jobseeker = await JobSeeker.findById(jobseeker_id);
        if (!jobseeker) {
            return res.status(404).json({ message: "Job seeker not found" });
        }
        if (jobseeker.resumeUrl === "No resume uploaded") {
            return res.status(400).json({ message: "Resume is required to apply for this job" });
        }

        const existingApplication = await Application.findOne({ job_id, applicant_id: jobseeker_id });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job" });
        }

        const application = new Application({
            job_id,
            applicant_id: jobseeker_id,
            resume: jobseeker.resumeUrl,
        });

        await application.save();

        return res.status(201).json({ message: "Application submitted successfully", application });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ message: "Internal server error. Please try again later." });
    }
};
