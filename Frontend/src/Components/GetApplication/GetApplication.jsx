import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Search, FileText } from "lucide-react";

function GetApplications() {
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getallapplication", {
                    withCredentials: true,
                });
                setApplications(response.data.applications);
                setFilteredApplications(response.data.applications);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredApplications(applications);
        } else {
            const filtered = applications.filter(app =>
                app.job_id?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicant_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicant_id?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.status?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredApplications(filtered);
        }
    }, [searchTerm, applications]);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Job Applications</h2>

            {/* Search Bar */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by job, applicant, email or status..."
                        className="text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto mb-2" />}
            {error && <p className="text-red-600 text-center mb-2">{error}</p>}
            {!loading && !error && filteredApplications.length === 0 && (
                <p className="text-gray-500 text-center mb-2">
                    {searchTerm ? "No matching applications found" : "No applications found."}
                </p>
            )}

            {!loading && !error && filteredApplications.length > 0 && (
                <p className="text-lg font-semibold text-blue-600 text-center mb-4">
                    Showing {filteredApplications.length} of {applications.length} applications
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Job Title</th>
                            <th className="py-3 px-4">Applicant</th>
                            <th className="py-3 px-4">Contact</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Applied Date</th>
                            <th className="py-3 px-4">Resume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((app) => (
                            <tr key={app._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4 text-center">
                                    <div className="font-medium text-gray-800">{app.job_id?.title || "N/A"}</div>
                                    <div className="text-sm text-gray-500">{app.job_id?.company_id?.name || "N/A"}</div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="font-medium text-gray-800">{app.applicant_id?.name || "N/A"}</div>
                                    <a 
                                        href={`mailto:${app.applicant_id?.email}`} 
                                        className="text-sm text-blue-500 hover:underline"
                                    >
                                        {app.applicant_id?.email || "N/A"}
                                    </a>
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {app.applicant_id?.contact_no ? (
                                        <a 
                                            href={`tel:${app.applicant_id.contact_no}`} 
                                            className="text-blue-500 hover:underline"
                                        >
                                            {app.applicant_id.contact_no}
                                        </a>
                                    ) : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        app.status === 'hired' ? 'bg-green-100 text-green-800' :
                                        app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {app.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : 'N/A'}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "N/A"}
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {(app.resume || (app.applicant_id?.resumeUrl && app.applicant_id.resumeUrl !== 'a')) ? (
                                        <a
                                            href={app.resume || app.applicant_id.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline flex items-center justify-center"
                                        >
                                            <FileText className="mr-1 h-4 w-4" /> View
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 ">Not available</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GetApplications;