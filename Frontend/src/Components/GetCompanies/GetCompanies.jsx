import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Search } from "lucide-react";

function GetCompanies() {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getallcompanies", {
                    withCredentials: true,
                });
                setCompanies(response.data.companies);
                console.log(response.data.companies);
                setFilteredCompanies(response.data.companies);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch companies.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCompanies(companies);
        } else {
            const filtered = companies.filter(company =>
                company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                company.contact_no?.includes(searchTerm) ||
                company.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredCompanies(filtered);
        }
    }, [searchTerm, companies]);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Registered Companies</h2>

            {/* Search Bar - Added this section while keeping rest of UI identical */}
            <div className="mb-6 flex justify-center">
                <div className="relative w-full max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name, email, location or phone..."
                        className="text-black block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && filteredCompanies?.length === 0 && (
                <p className="text-gray-500 text-center">
                    {searchTerm ? "No matching companies found" : "No companies found."}
                </p>
            )}

            {/* Display total count - now shows filtered count */}
            {!loading && !error && filteredCompanies?.length > 0 && (
                <p className="text-lg font-semibold text-blue text-center mb-4">
                    Showing {filteredCompanies?.length} of {companies?.length} companies
                </p>
            )}

            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4">Logo</th>
                            <th className="py-3 px-4">Company Name</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Contact No.</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.map((company) => (
                            <tr key={company._id} className="border-b hover:bg-gray-50">
                                <td className="py-4 px-4 text-center">
                                    <img 
                                        src={company.logo || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} 
                                        alt="Company Logo" 
                                        className="w-10 h-10 rounded-full mx-auto"
                                        onError={(e) => {
                                            e.target.src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
                                        }}
                                    />
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-800 text-center">{company.name}</td>
                                <td className="py-4 px-4 text-center text-black">
                                    <a href={`mailto:${company.email}`} className="text-blue-500 hover:underline">
                                        {company.email}
                                    </a>
                                </td>
                                <td className="py-4 px-4 text-center text-black">
                                    {company.contact_no ? (
                                        <a href={`tel:${company.contact_no}`} className="text-blue-500 hover:underline">
                                            {company.contact_no}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                                <td className="py-4 px-4 text-center text-black">{company.location || "Not specified"}</td>
                                <td className="py-4 px-4 text-center text-black">
                                    {company.website ? (
                                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                            Visit
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

export default GetCompanies;