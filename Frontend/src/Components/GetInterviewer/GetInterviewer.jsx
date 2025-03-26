import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, FileText, Link2, Search } from "lucide-react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { toast } from 'react-toastify';

function GetInterviewer() {
    const [interviewer, setInterviewer] = useState([]);
    const [filteredInterviewer, setFilteredInterviewer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchInterviewer = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/interviewer/getallinterviewers", {
                    withCredentials: true,
                });
                if (response?.data?.success) {
                    setInterviewer(response?.data?.data);
                    setFilteredInterviewer(response?.data?.data);
                }
                else {
                    toast.error(response?.data?.message);
                }
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || "Failed to fetch job seekers.");
            } finally {
                setLoading(false);
            }
        };

        fetchInterviewer();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredInterviewer(interviewer);
        } else {
            const filtered = interviewer.filter(seeker =>
                seeker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seeker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seeker.phone?.includes(searchTerm)
            );
            setFilteredInterviewer(filtered);
        }
    }, [searchTerm, interviewer]);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Registered Job Seekers</h2>

            {/* Search Bar - Added this section while keeping rest of UI identical */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-black" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        className="text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && filteredInterviewer?.length === 0 && (
                <p className="text-gray-500 text-center">
                    {searchTerm ? "No matching Interviewers found" : "No Interviewers found."}
                </p>
            )}

            {/* Display total count - now shows filtered count */}
            {!loading && !error && filteredInterviewer?.length > 0 && (
                <p className="text-lg font-semibold text-blue text-center mb-4">
                    Showing {filteredInterviewer.length} of {interviewer.length} Interviewers
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Experience</th>
                            <th className="py-3 px-4">Contact No.</th>
                            <th className="py-3 px-4">Specialization</th>
                            <th className="py-3 px-4">Rating</th>
                            <th className="py-3 px-4">LinkedIn Profile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInterviewer?.map((seeker) => (
                            <tr key={seeker._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                                {/* Name */}
                                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200 text-center">
                                    {seeker.name}
                                </td>

                                {/* Email */}
                                <td className="py-4 px-4 text-center text-black dark:text-gray-300">
                                    <a href={`mailto:${seeker.email}`} className="text-blue-500 hover:underline">
                                        {seeker.email}
                                    </a>
                                </td>

                                {/* Experience */}
                                <td className="py-4 px-4 text-center text-black dark:text-gray-300">
                                    {seeker.experience || "0"} {seeker.experience === "1" ? "year" : "years"}
                                </td>

                                {/* Contact No. */}
                                <td className="py-4 px-4 text-center text-black dark:text-gray-300">
                                    {seeker.phone ? (
                                        <a href={`tel:${seeker.phone}`} className="text-blue-500 hover:underline">
                                            {seeker.phone}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>

                                {/* Specialization */}
                                <td className="py-4 px-4 text-center text-black dark:text-gray-300">
                                    {seeker.specialization || "N/A"}
                                </td>

                                {/* Rating */}
                                <td className="py-4 px-4 text-center text-black dark:text-gray-300">
                                    {seeker.rating ? `${seeker.rating} ⭐` : "N/A"}
                                </td>

                                {/* LinkedIn Profile */}
                                <td className="py-4 px-4 text-center">
                                    {seeker.linkedInProfile ? (
                                        <a href={seeker.linkedInProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center justify-center gap-1">
                                            <FaLinkedin className="text-blue-600" /> View
                                        </a>
                                    ) : (
                                        "N/A"
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

export default GetInterviewer;