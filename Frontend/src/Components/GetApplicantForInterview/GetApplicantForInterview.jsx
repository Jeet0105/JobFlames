import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, CheckCircle, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

function GetApplicantForInterview() {
    const { id } = useParams(); // Job ID
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);
    const [jobseeker_id, setJobseeker_id] = useState(null);
    console.log(applicants);
    
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/interviewer/getAllApplicantForInterview/${id}`, {
                    withCredentials: true,
                });
                if (response?.data?.success) {
                    setApplicants(response.data.data);
                }
                else {
                    toast.error(response?.data?.message);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch applicants.");
                toast.error(err?.response?.data?.message)
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, [id]);

    const updateStatus = async (applicantId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/company/update-status/${applicantId}`,
                { status: newStatus },
                { withCredentials: true }
            );
            setApplicants((prevApplicants) =>
                prevApplicants.map((app) =>
                    app.applicationId === applicantId ? { ...app, status: newStatus } : app
                )
            );
            toast.success(response.data.message);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status.");
        }
    };

    const handleScheduleInterview = async () => {
        try {
            setShowPopup(false);
            // Step 1: Get Zoom Access Token
            const resToken = await axios.get('http://localhost:3000/api/v1/zoom/getAuthorization');
            const accessToken = resToken.data.data;

            // Step 2: Set startTime to 3 hours later
            const startTime = new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString();

            // Step 3: Create Meeting
            const meetingPayload = {
                accessToken,
                topic: "Interview",
                startTime, // 3 hours from now
                duration: 30, // 30 minutes interview
                job_id: id,
                jobseeker_id,
                interviewer_id: currentUser._id
            };
            console.log(meetingPayload);
            
            const resMeeting = await axios.post('http://localhost:3000/api/v1/zoom/create-zoom-meeting', meetingPayload);

            console.log("Meeting Created:", resMeeting);
            updateStatus(jobseeker_id,"interview")
            toast.success("Meeting scheduled successfully ✅");

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to schedule interview.");
        }
    };
    const handleData = (jsid) =>{
        console.log("aa",jsid);
        
        setShowPopup(true)
        setJobseeker_id(jsid)
    }
    return (
        <div className="min-h-screen p-6 ml-6">
            <h2 className="text-3xl font-bold text-blue text-center mb-6">Job Applicants</h2>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && applicants.length === 0 && (
                <p className="text-gray-500 text-center">No applicants found for this job.</p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Applicant</th>
                            <th className="py-3 px-4">Experience</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Resume</th>
                            <th className="py-3 px-4">Applied At</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((app) => (
                            <tr key={app?.applicationId} className="border-b">
                                <td className="py-4 px-4 flex items-center">
                                    <img src={app?.profilePicture} alt="Profile" className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-medium text-gray-800">{app?.name}</p>
                                        <p className="text-gray-500 text-sm">{app?.email}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center text-black">{app?.experience} years</td>
                                <td className="py-4 px-4 text-center text-black">{app?.contact_no}</td> {/* Display Contact Number */}
                                <td className="py-4 px-4 text-center">
                                    {app?.resume === "No resume uploaded" || app?.resume === "a" || app.resume === "No Resume Url" ? (
                                        <p className="text-red-500">NA</p>
                                    ) : (
                                        <a
                                            href={app?.resume}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline flex items-center cursor-pointer justify-center"
                                        >
                                            <FileText className="mr-1" /> View
                                        </a>
                                    )}
                                </td>
                                <td className="py-4 px-4 text-center text-gray-600">
                                    {new Date(app?.appliedAt).toLocaleDateString()} {/* Format Applied Date */}
                                </td>
                                <td className={`py-4 px-4 text-center font-semibold ${app?.status === "shortlisted" ? "text-green-600" : app?.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
                                    {app?.status}
                                </td>
                                <td className="py-4 px-4 flex gap-2 justify-center">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition disabled:opacity-50 flex justify-center items-center gap-2"
                                        onClick={()=>handleData(app?.jseeker_id)}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Schedule Interview
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>



            {showPopup && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4 text-black">
                            Are you sure you want to proceed with interviewing this candidate?
                        </h3>
                        <div className="flex justify-center gap-3">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                onClick={() => setShowPopup(false)}
                            >
                                No
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={() => handleScheduleInterview()}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default GetApplicantForInterview;
