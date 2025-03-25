import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

function GetCompanies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/user/getallcompanies", {
                    withCredentials: true,
                });
                setCompanies(response.data.companies);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Failed to fetch companies.");
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <div className="min-h-screen p-6">
            <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Registered Companies</h2>

            {loading && <Loader2 className="animate-spin text-blue-500 h-10 w-10 mx-auto" />}
            {error && <p className="text-red-600 text-center">{error}</p>}
            {!loading && !error && companies.length === 0 && (
                <p className="text-gray-500 text-center">No companies found.</p>
            )}

            {/* Display total count */}
            {!loading && !error && companies.length > 0 && (
                <p className="text-lg font-semibold text-blue text-center mb-4">
                    Total Companies: {companies.length}
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
                        {companies.map((company) => (
                            <tr key={company._id} className="border-b">
                                <td className="py-4 px-4 text-center">
                                    <img src={company.logo} alt="Company Logo" className="w-10 h-10 rounded-full mx-auto" />
                                </td>
                                <td className="py-4 px-4 font-medium text-gray-800 text-center">{company.name}</td>
                                <td className="py-4 px-4 text-center text-black">{company.email}</td>
                                <td className="py-4 px-4 text-center text-black">{company.contact_no}</td>
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
