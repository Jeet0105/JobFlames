import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, FileText, Link2, Search } from "lucide-react";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";

function GetJobSeekers() {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [filteredSeekers, setFilteredSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchJobSeekers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getallusers", {
                    withCredentials: true,
                });
                setJobSeekers(response.data.users);
                setFilteredSeekers(response.data.users);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch job seekers.");
            } finally {
                setLoading(false);
            }
        };

        fetchJobSeekers();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredSeekers(jobSeekers);
        } else {
            const filtered = jobSeekers.filter(seeker =>
                seeker.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seeker.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                seeker.contact_no?.includes(searchTerm)
            );
            setFilteredSeekers(filtered);
        }
    }, [searchTerm, jobSeekers]);

    return (
        <div className="min-h-screen p-6 ml-6">
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
            {!loading && !error && filteredSeekers.length === 0 && (
                <p className="text-gray-500 text-center">
                    {searchTerm ? "No matching job seekers found" : "No job seekers found."}
                </p>
            )}

            {/* Display total count - now shows filtered count */}
            {!loading && !error && filteredSeekers.length > 0 && (
                <p className="text-lg font-semibold text-blue text-center mb-4">
                    Showing {filteredSeekers.length} of {jobSeekers.length} job seekers
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Profile</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Experience</th>
                            <th className="py-3 px-4">Contact No.</th>
                            <th className="py-3 px-4">Resume</th>
                            <th className="py-3 px-4">Links</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSeekers.map((seeker) => (
                            <tr key={seeker._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4 text-center">
                                    <img
                                        src={seeker.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full mx-auto"
                                        onError={(e) => {
                                            e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
                                        }}
                                    />
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-800 text-center">{seeker.name}</td>
                                <td className="py-4 px-4 text-center text-black">
                                    <a href={`mailto:${seeker.email}`} className="text-blue-500 hover:underline">
                                        {seeker.email}
                                    </a>
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {seeker.experience || "0"} {seeker.experience === "1" ? "year" : "years"}
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {seeker.contact_no ? (
                                        <a href={`tel:${seeker.contact_no}`} className="text-blue-500 hover:underline">
                                            {seeker.contact_no}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {seeker.resumeUrl && seeker.resumeUrl !== "No Resume Url" ? (
                                        <a
                                            href={seeker.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline flex items-center justify-center gap-1"
                                        >
                                            <FileText className="h-4 w-4" /> View
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    {seeker.AllLinks?.length > 0 ? (
                                        <div className="flex items-center gap-2">
                                            {seeker.AllLinks.slice(0, 2).map((link, index) => {
                                                if (!link?.LinkLabel || !link?.link) return null;

                                                return link.LinkLabel.toLowerCase().includes("github") ? (
                                                    <a
                                                        key={index}
                                                        href={link.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaGithub className="text-black" />
                                                    </a>
                                                ) : link.LinkLabel.toLowerCase().includes("linkedin") ? (
                                                    <a
                                                        key={index}
                                                        href={link.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <FaLinkedin className="text-blue-600" />
                                                    </a>
                                                ) : null;
                                            })}
                                            {seeker.AllLinks.length > 2 && (
                                                <span className="text-xs text-gray-500">
                                                    +{seeker.AllLinks.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-black">N/A</span>
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

export default GetJobSeekers;