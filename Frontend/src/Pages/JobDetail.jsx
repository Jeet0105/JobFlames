import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, Briefcase, IndianRupee, Building } from "lucide-react";

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/user/getjobdetail/${id}`, {
          withCredentials: true
        });
        setJob(res.data);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetail();
  }, []);

  const handleApply = async (job_id) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/application/apply/${id}`, {}, { withCredentials: true });
      setMessage({ type: "success", text: "Application submitted successfully!" });
    } catch (error) {
      console.error("Error applying for job:", error);
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to apply." });
    }
  }

  if (loading) return <p className="text-center text-gray-500 min-h-screen">Loading job details...</p>;
  if (error) return <p className="text-center text-red-500 min-h-screen">{error}</p>;
  if (!job) return <p className="text-center text-gray-500 min-h-screen">Job not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-[50vh] bg-[#1b3453] shadow-lg rounded-lg m-5">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-6">
        <h2 className="text-3xl font-bold">{job.title}</h2>
        <p className="mt-1 text-sm text-gray-200">Posted by {job.company_id.name}</p>
      </div>

      {/* Job Details Section */}
      <div className="p-6">
        {/* Company Info */}
        <div className="flex items-center gap-4 mb-6">
          <img src={job.company_id.logo} alt="Company Logo" className="w-16 h-16 rounded-full object-cover border shadow-sm" />
          <div>
            <p className="text-xl font-semibold">{job.company_id.name}</p>
            <p className="text-gray-500 text-sm flex items-center"><Building className="w-4 h-4 mr-1" /> {job.company_id.location}</p>
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="grid grid-cols-2 gap-6 text-white">
          <p className="flex items-center text-lg"><Briefcase className="mr-2 w-5 h-5 text-blue-600" /> {job.job_type}</p>
          <p className="flex items-center text-lg"><MapPin className="mr-2 w-5 h-5 text-green-600" /> {job.location}</p>
          <p className="flex items-center text-lg"><IndianRupee className="mr-2 w-5 h-5 text-yellow-600" /> {job.salary_expected}</p>
          <p className="text-lg text-white">Experience: {job.experience} years</p>
        </div>

        {/* Job Description */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">Job Description</h3>
          <p className="text-white leading-relaxed">{job.description}</p>
        </div>

        {/* Skills Required */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-2">Required Skills</h3>
          <div className="flex flex-wrap mt-1">
            {job.skills_required.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2 shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-lg hover:opacity-90 w-full text-lg font-semibold shadow-md" onClick={() => handleApply(id)}>
          Apply Now
        </button>
        {message && (
        <p className={`text-center font-semibold mt-7 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}>
          {message.text}
        </p>
      )}
      </div>
    </div>
  );
}

export default JobDetail;
