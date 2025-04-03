import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, Briefcase, Calendar, Clock, ListChecks } from "lucide-react";
import { toast } from "react-toastify";

function ScheduleInterview() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/interviewer/getAllJobsForInterviewer`, {
                    withCredentials: true,
                });
                if (response?.data?.success) {
                    setJobs(response?.data?.data);
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch jobs.");
                toast.error(err?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col items-center py-10 ml-6">
            <h2 className="text-4xl font-extrabold text-blue-600 mb-10">Select Job For Interview</h2>

            {loading && <Loader2 className="animate-spin text-blue-500 h-12 w-12" />}
            {error && <p className="text-red-600 bg-red-100 px-4 py-3 rounded-md">{error}</p>}
            {!loading && !error && jobs.length === 0 && <p className="text-gray-500 text-lg mt-4">No jobs found.</p>}

            <div className="grid gap-6 w-full max-w-5xl px-4 md:grid-cols-2 lg:grid-cols-3">
                {jobs.map((job) => (
                    <div
                        key={job._id}
                        className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => navigate(`/profile/myjobdetail/${job._id}`)}
                    >
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                            <Briefcase className="mr-2 text-blue-600" /> {job.title}
                        </h3>
                        <p className="text-gray-600 mt-2 text-sm">{job.description}</p>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center text-gray-700">
                                <Calendar className="mr-2 text-purple-500" /> 
                                <span>Posted: {new Date(job.createdAt).toDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <Clock className="mr-2 text-red-500" /> 
                                <span>Job Type: {job.job_type}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <ListChecks className="mr-2 text-green-500" /> 
                                <span>Skills: {job.skills_required?.join(", ") || "Not specified"}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScheduleInterview;
