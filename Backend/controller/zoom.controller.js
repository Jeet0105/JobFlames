import axios from "axios";
import Job from "../model/Job.modem.js";
import JobSeeker from "../model/JobSeeker.model.js";
import Interviewer from "../model/Interviewer.model.js";
import Interview from "../model/interviews.model.js";

const getAuthorizedToken = async (req, res) => {
    try {
        
        const tokenUrl = "https://zoom.us/oauth/token?grant_type=client_credentials";
        const authString = Buffer.from(`${process.env.ZOOM_CLIENTID}:${process.env.ZOOM_CLIENTSECRET}`).toString("base64");

        const response = await axios.post(tokenUrl, null, {
            headers: {
              Authorization: `Basic ${authString}`,
            },
          });

          if (!response?.data?.access_token){
            return res.status(400).json({
              message : "Zoom authentication failed",
              status : 400,
              success : false
            })
          }

        return res.status(200).json({
            message : "Zoom authentication successful",
            status : 200,
            success : true,
            data : response?.data.access_token
        })

    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            status : 500,
            success : false
        })
    }
}

const createZoomMeeting = async (req, res) => {
  
    const { accessToken, topic, startTime, duration,job_id, jobseeker_id,interviewer_id } = req.body;

    try {

    if (!accessToken || !topic || !startTime || !duration || !job_id || !jobseeker_id || !interviewer_id) {
      return res.status(400).json({
          message: "Missing required fields",
          status: 400,
          success: false
      })
    }

    const Ejob = await Job.findById(job_id);
    if (!Ejob) {
      return res.status(404).json({
          message: "Job not found",
          status: 404,
          success: false
      })
    } 

    const Ejobseeker = await JobSeeker.findById(jobseeker_id);
    if (!Ejobseeker) {
      return res.status(404).json({
          message: "Jobseeker not found",
          status: 404,
          success: false
      })
    }

    const Einterviewer = await Interviewer.findById(interviewer_id);
    if (!Einterviewer) {
      return res.status(404).json({
          message: "Interviewer not found", 
          status: 404,
          success: false
      })
    } 

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // Scheduled Meeting
        start_time: startTime, // Format: YYYY-MM-DDTHH:mm:ssZ (UTC)
        duration,
        timezone: "Asia/Kolkata",
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false, // Ensures meeting starts only when host joins
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    ); 


    if(!response?.data?.join_url || !response?.data?.start_url){
      return res.status(500).json({
        message : "Zoom meeting creation failed",
        status : 500,
        success : false
      })
    }

    const interviewss = await Interview.create({ job_id: job_id, 
      jobseeker_id: jobseeker_id, 
      interviewer_id: interviewer_id, 
      interview_date: startTime, 
      start_url: response?.data?.start_url });

    if (!interviewss){
      return res.status(500).json({
        message : "something went wrong",
        status : 500,
        success : false
      })
    }

    return res.status(200).json({
      message : "Zoom meeting created successfully",
      status : 200,
      success : true,
      data : interviewss
    })

  } catch (error) {
    console.log("In Zoom meeting create Error : ", error);
    return res.status(500).json({
      message : "Internal server error",
      status : 500,
      success : false
    })    
  }
}


export { getAuthorizedToken, createZoomMeeting };