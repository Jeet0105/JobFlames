import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from 'react-router-dom';

function ScheduleZoomInterview() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchParams] = useSearchParams();
    const jsid = searchParams.get('jsid') || '';
    const jobid = searchParams.get('jobid') || '';
    const appid = searchParams.get('appid') || '';
    const [topic, setTopic] = useState("Interview");
    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(30);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const updateStatus = async (newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/company/update-status/${appid}`,
                { status: newStatus },
                { withCredentials: true }
            );
            toast.success(response.data.message);
            navigate("/profile/getScheduleInterview")
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to update status.");
            return false;
        }
    };

    const handleScheduleMeeting = async () => {
        if (!topic || !startTime || !duration || !jsid || !jobid) {
            toast.error("Please fill in all fields.");
            return;
        }

        setLoading(true);
        try {
            // 1. Get Zoom Access Token
            const resToken = await axios.get(
                "http://localhost:3000/api/v1/zoom/getAuthorization",
                { withCredentials: true }
            );
            const accessToken = resToken.data.data;

            // 2. Schedule Zoom Meeting
            const meetingPayload = {
                accessToken,
                topic,
                startTime: new Date(startTime).toISOString(),
                duration,
                job_id: jobid,
                jobseeker_id: jsid,
                interviewer_id: currentUser._id,
            };

            const res = await axios.post(
                "http://localhost:3000/api/v1/zoom/create-zoom-meeting",
                meetingPayload,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success("Interview scheduled successfully!");
                // 3. Update Application Status
                await updateStatus("interview");
            } else {
                toast.error("Failed to schedule meeting.");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 flex justify-center items-start">
            <div className="p-6 rounded-2xl shadow-md w-full max-w-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Schedule Zoom Interview</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                    <input
                        type="number"
                        min={15}
                        max={120}
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>

                <button
                    onClick={handleScheduleMeeting}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                    {loading && <Loader2 className="animate-spin h-5 w-5" />}
                    {loading ? "Scheduling..." : "Schedule Interview"}
                </button>
            </div>
        </div>
    );
}

export default ScheduleZoomInterview;