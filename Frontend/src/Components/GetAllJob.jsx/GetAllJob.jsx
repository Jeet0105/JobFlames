import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Search, Briefcase, Building, MapPin, Clock, DollarSign } from "lucide-react";

function GetAllJob() {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getalladminjobs", {
                    withCredentials: true,
                });

                const fetchedJobs = Array.isArray(response.data.jobs) ? response.data.jobs : [];
                setJobs(fetchedJobs);
                setFilteredJobs(fetchedJobs);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch jobs.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredJobs(jobs);
        } else {
            const filtered = jobs.filter(job =>
                job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job?.company_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job?.employmentType?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredJobs(filtered);
        }
    }, [searchTerm, jobs]);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">All Job Listings</h2>

            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by job title, company, location or type..."
                        className="text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-blue-500 h-12 w-12" />
                </div>
            )}

            {error && (
                <div className="text-center p-6 bg-red-50 rounded-lg max-w-md mx-auto">
                    <h3 className="text-red-600 font-medium">Error Loading Jobs</h3>
                    <p className="text-red-500 mt-2">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    {Array.isArray(filteredJobs) && filteredJobs.length > 0 && (
                        <p className="text-lg font-semibold text-blue-600 text-center mb-4">
                            Showing {filteredJobs.length} of {jobs.length} jobs
                        </p>
                    )}

                    {Array.isArray(filteredJobs) && filteredJobs.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-900">
                                {searchTerm ? "No matching jobs found" : "No jobs available"}
                            </h3>
                            <p className="mt-1 text-gray-500">
                                {searchTerm ? "Try a different search term" : "Check back later for new job postings"}
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white shadow rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-500 text-white">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Job Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Salary</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Posted</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredJobs.map((job) => (
                                            <tr key={job._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Briefcase className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                                        <div className="font-medium text-gray-900">{job?.title || "N/A"}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <Building className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                                        <div className="text-sm text-gray-900">{job?.company_id?.name || "N/A"}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <MapPin className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                                        <div className="text-sm text-gray-900">{job?.location || "Remote"}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {job?.employmentType || "Full-time"}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        {job?.salary_expected || "Not disclosed"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="flex items-center">
                                                        <Clock className="flex-shrink-0 h-5 w-5 text-gray-400 mr-2" />
                                                        {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default GetAllJob;
