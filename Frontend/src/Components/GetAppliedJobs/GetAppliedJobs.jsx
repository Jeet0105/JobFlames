import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

function GetAppliedJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getappiedjob", {
                    withCredentials: true,
                });
                setJobs(response.data.jobs);
            } catch (err) {
                console.error("Error fetching applied jobs:", err);
                setError(err.response?.data?.message || "Failed to fetch applied jobs.");
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, []);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-500 text-center mb-6">My Applied Jobs</h2>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && jobs.length === 0 && (
                <p className="text-gray-500 text-center">You have not applied for any jobs yet.</p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Job Title</th>
                            <th className="py-3 px-4">Company</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Applied At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.applicationId} className="border-b">
                                <td className="py-4 px-4 text-center font-medium text-black">{job.jobTitle}</td>
                                <td className="py-4 px-4 text-center text-black">{job.company}</td>
                                <td className="py-4 px-4 text-center text-black">{job.location}</td>
                                <td
                                    className={`py-4 px-4 text-center font-semibold ${
                                        job.status === "shortlisted" ? "text-green-600" : 
                                        job.status === "rejected" ? "text-red-600" : 
                                        "text-gray-600"
                                    }`}
                                >
                                    {job.status}
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {new Date(job.appliedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetAppliedJobs;
