import Application from '../model/Application.model.js';
import Interviewer from '../model/Interviewer.model.js';
import Interview from '../model/interviews.model.js';
import Job from '../model/Job.modem.js';
import JobSeeker from '../model/JobSeeker.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


export const getallinterviewer = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({
            message: "You are unauthorized",
            status: 401,
            success: false
        })
    }

    try {

        const user = await JobSeeker.findById(userId);

        if (!user.isAdmin) {
            return res.status(401).json({
                message: "Unauthorized : You can not get all interviewers",
                status: 401,
                success: false
            })
        }

        const AllInterviewers = await Interviewer.find();

        if (!AllInterviewers || AllInterviewers.length === 0) {
            return res.status(404).json({
                message: "No interviewers found",
                status: 404,
                success: false
            })
        }

        return res.status(200).json({
            message: "All interviewers fetched successfully",
            status: 200,
            success: true,
            data: AllInterviewers
        })

    } catch (error) {
        console.log("Error while getting all interviewers : ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            success: false
        })
    }
}


export const updateInterviewer = async (req, res) => {
    const { name, email, phone, specialization, experience, linkedin } = req.body;
    const interviewer_id = req.user.id;
    let logoUrl = null;


    if (!interviewer_id) {
        return res.status(401).json({
            message: "You are unauthorized",
            status: 401,
            success: false
        })
    }

    if (!name || !email || !phone || !specialization || !experience || !linkedin) {
        return res.status(400).json({
            message: "All fields are required",
            status: 400,
            success: false
        })
    }

    try {

        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({
                message: "Please enter a valid phone number.",
                status: 400,
                success: false
            });
        }

        const existing = await Interviewer.find({ email });
        if (existing.length > 1) {
            existing.forEach((user) => {
                if (user._id !== interviewer_id) {
                    return res.status(400).json({
                        message: "Email already exists",
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
            logoUrl = uploadResponse?.secure_url || null;
        }


        const updatedInterviewer = await Interviewer.findByIdAndUpdate(interviewer_id, {
            name,
            email,
            phone,
            specialization,
            experience,
            linkedInProfile: linkedin,
            profilePicture: logoUrl
        }, { new: true });

        if (!updatedInterviewer) {
            return res.status(404).json({
                message: "Interviewer not found",
                status: 404,
                success: false
            })
        }

        const updatedInterviewers = updatedInterviewer.toObject();
        updatedInterviewers.role = "interviewer";

        return res.status(200).json({
            message: "Interviewer updated successfully",
            status: 200,
            success: true,
            data: updatedInterviewers
        })


    } catch (error) {
        console.log("Error while updating interviewer : ", error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500,
            success: false
        })
    }

}

export const getAllJobsForInterviewer = async (req, res) => {
    try {
        if (req.user?.role !== 'interviewer') {
            return res.status(403).json({
                success: false,
                status: 403,
                message: "Unauthorized: Only Interviewer can access this resource"
            });
        }

        // Get all jobs with populated company details
        const jobs = await Job.find()
            .populate({
                path: "company_id",
                select: "name email logo contact_no",
            })
            .sort({ createdAt: -1 })

        if (!jobs.length) {
            return res.status(404).json({
                success: true,
                message: "No jobs found",
                status: 404,
                data: [],
                count: 0
            });
        }

        return res.status(200).json({
            message: "Jobs Fetched successFully...!",
            success: true,
            status: 200,
            count: jobs.length,
            data: jobs
        });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const getAllApplicantForInterview = async (req, res) => {
    const { id } = req.params;

    try {
        const applications = await Application.find({ job_id: id, status: "shortlisted" })
            .populate({
                path: "applicant_id",
                select: "name email profilePicture resumeUrl contact_no experience"
            })
            .select("status resume createdAt applicant_id")
            .sort({ createdAt: -1 });

        console.log('Shortlisted applications: ', applications);

        if (!applications.length) {
            return res.status(404).json({
                message: "No shortlisted applicants found for this job.",
                status: 404,
                success: false
            });
        }


        const formattedApplicants = applications.map(app => ({
            applicationId: app._id,
            jseeker_id: app.applicant_id?._id || "Not available",
            name: app.applicant_id?.name || "Not available",
            email: app.applicant_id?.email || "Not available",
            profilePicture: app.applicant_id?.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            resume: app.applicant_id?.resumeUrl || "No resume available",
            contact_no: app.applicant_id?.contact_no || "Not provided",
            experience: app.applicant_id?.experience || "Not specified",
            status: app.status,
            appliedAt: app.createdAt
        }));

        res.status(200).json({
            message: "Applicant fetch successFully..!",
            status: 200,
            success: true,
            count: formattedApplicants.length,
            data: formattedApplicants
        });
    } catch (error) {
        console.error("Error fetching shortlisted applicants:", error);
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            success: false,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const getAllMyScheduledInterview = async (req, res) => {
    const id = req.user.id;

    try {
        const ScheduledInterviews = await Interview.find({
            interviewer_id: id,
            status: "scheduled",
        })
            .populate({
                path: "jobseeker_id",
                select: "name email profilePicture resumeUrl contact_no experience",
            })
            .populate({
                path: "job_id",
                select: "title company location",
            });

        if (!ScheduledInterviews || ScheduledInterviews.length === 0) {
            return res.status(404).json({
                message: "No Scheduled Interview",
                success: false,
            });
        }

        const enrichedInterviews = await Promise.all(
            ScheduledInterviews.map(async (interview) => {
                const application = await Application.findOne({
                    job_id: interview.job_id._id,
                    applicant_id: interview.jobseeker_id._id,
                });

                return {
                    ...interview.toObject(),
                    application_id: application?._id || null,
                };
            })
        );

        return res.status(200).json({
            message: "Scheduled Interviews",
            data: enrichedInterviews,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching scheduled interviews:", error);
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            success: false,
        });
    }
};

export const updateInterviewStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }
        const updatedInterview = await Interview.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!updatedInterview) {
            return res.status(404).json({
                message: "Interview not found",
                status: 404,
                success: false,
                data: updatedInterview
            })
        }
        return res.status(200).json({
            message: "Interview status updated",
            status: 404,
            success: true,
        })
    } catch (error) {
        console.error("Error fetching shortlisted applicants:", error);
        return res.status(500).json({
            message: "Internal server error.",
            status: 500,
            success: false,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

export const getAllCompletedInterviews = async (req, res) => {
    const id = req.user.id;

    try {
        const completedInterview = await Interview.find({
            interviewer_id: id,
            status: "completed",
        })
            .populate({
                path: "jobseeker_id",
                select: "name email profilePicture resumeUrl contact_no experience",
            })
            .populate({
                path: "job_id",
                select: "title company location",
            });
        if (!completedInterview || completedInterview.length === 0) {
            return res.status(404).json({
                message: "No Completed Interview",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Completed Interviews",
            data: completedInterview,
            success: true,
        });
    } catch (error) {
        console.error("Error fetching completed interviews:", error);
        res.status(500).json({
            message: "Internal server error.",
            status: 500,
            success: false,
        });
    }
}