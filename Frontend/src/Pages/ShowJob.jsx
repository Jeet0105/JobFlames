import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';
import  { useNavigate } from 'react-router-dom';

function ShowJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getalljobs`, { withCredentials: true });
        setJobs(res.data);
        setFilteredJobs(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
      job.location.toLowerCase().includes(e.target.value.toLowerCase()) ||
      job.company_id.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const calculateDaysAgo = (createdAt) => {
    const now = new Date();
    const postedDate = new Date(createdAt);
    const differenceInTime = now - postedDate;
    const daysAgo = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-[50vh]">
      <h2 className="text-3xl font-bold text-[#254A74] mb-6 text-center">Find Your Dream Job</h2>

      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search jobs by title, location, or company..." 
        value={search} 
        onChange={handleSearch} 
        className="w-full p-3 rounded-lg mb-6 border-gray-900 border-2 text-black" 
      />
      
      {/* Error / Loading */}
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center text-[#254A74] font-bold text-xl">No jobs found.</p>
      ) : (
        <div className="flex gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="w-full md:w-[45%] lg:w-[30%] p-5 bg-[#1b3453] shadow-lg rounded-xl text-white">
              {/* Job Title */}
              <h3 className="text-xl font-semibold">{job.title}</h3>
              
              {/* Company Name */}
              <p className="text-sm text-gray-300">Company: <span className="font-bold">{job.company_id.name}</span></p>
              
              {/* Posted X days ago */}
              <p className="text-xs text-gray-400">Posted {calculateDaysAgo(job.createdAt)}</p>

              {/* Job Type */}
              <p className="flex items-center mt-2"><Briefcase className="mr-2" /> {job.job_type}</p>

              {/* Location */}
              <p className="flex items-center"><MapPin className="mr-2" /> {job.location}</p>

              {/* Salary */}
              <p className="flex items-center"><IndianRupee className="mr-2" /> {job.salary_expected}</p>

              {/* Skills */}
              <div className="mt-3">
                <span className="text-sm font-bold">Required Skills:</span>
                <div className="flex flex-wrap mt-1">
                  {job.skills_required.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full mr-2 mb-1">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Apply Now Button */}
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full" onClick={()=>navigate(`/job/${job._id}`)}>
                Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowJobs;
