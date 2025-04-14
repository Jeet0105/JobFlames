import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

function GetCompletedInterview() {
    const [interviews, setInterviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(interviews);
    
    useEffect(() => {
        const fetchInterviews = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/api/v1/interviewer/getAllMyCompletedInterviews", {
                    withCredentials: true,
                });
                if (res.data?.data?.length > 0) {
                    setInterviews(res.data.data);
                } else {
                    toast.info("No interviews completed yet.");
                }
            } catch (error) {
                console.error("Error fetching interviews:", error);
                setError(error.response?.data?.message || "Failed to fetch completed interviews.");
            } finally {
                setLoading(false);
            }
        };
        fetchInterviews();
    }, []);

    const handleChangeStatus = async (status, id,intid) => {
        try {
            const res = await axios.put(
                "http://localhost:3000/api/v1/application/updateStatus",
                { appid: id, status: status },
                { withCredentials: true }
            );
            if (res.data.success) {
                toast.success(`Interview marked as ${status}`);
                try {
                    const response = await axios.put(
                        `http://localhost:3000/api/v1/interviewer/updateInterviewStatus/${intid}`,
                        { appid: id, status: status },
                        { withCredentials: true }
                    );
                    if (response.data.success) {
                        toast.success(`Interview marked as ${status}`);
                        window.location.reload();
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.error("Error changing interview status:", error);
            toast.error(error.response?.data?.message || "Failed to update status.");
        }
    };

    return (
        <div className="min-h-screen ml-2 p-6">
            <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">Completed Interviews</h2>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && interviews.length === 0 && (
                <p className="text-gray-500 text-center">No completed interviews.</p>
            )}

            {!loading && !error && interviews.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-md rounded-xl overflow-scroll">
                        <thead className="bg-blue-500 text-white text-sm">
                            <tr>
                                <th className="py-3 px-4">Candidate</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Contact</th>
                                <th className="py-3 px-4">Experience</th>
                                <th className="py-3 px-4">Select</th>
                                <th className="py-3 px-4">Reject</th>
                            </tr>
                        </thead>
                        <tbody>
                            {interviews.map((interview) => (
                                <tr key={interview._id} className="border-b text-center text-black text-sm">
                                    <td className="py-4 px-4 font-medium">{interview.jobseeker_id?.name}</td>
                                    <td className="py-4 px-4">{interview.jobseeker_id?.email}</td>
                                    <td className="py-4 px-4">{interview.jobseeker_id?.contact_no}</td>
                                    <td className="py-4 px-4">{interview.jobseeker_id?.experience} yrs</td>
                                    <td className="py-4 px-4">
                                        <button
                                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                                            onClick={() => handleChangeStatus("hired", interview.application_id,interview._id)}
                                        >
                                            Hire
                                        </button>
                                    </td>
                                    <td className="py-4 px-4">
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                                            onClick={() => handleChangeStatus("rejected", interview.application_id,interview._id)}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default GetCompletedInterview;
