import { useEffect, useState } from 'react';
import axios from 'axios';
import { MapPin, Briefcase, IndianRupee } from 'lucide-react';

function ShowJobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/user/getalljobs', { withCredentials: true });
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
    const filtered = jobs.filter(job => job.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setFilteredJobs(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Your Dream Job</h2>

      <input 
        type="text" 
        placeholder="Search jobs..." 
        value={search} 
        onChange={handleSearch} 
        className="w-full p-3 border rounded-lg mb-6" 
      />

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-center text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="p-5 bg-[#1b3453] shadow-lg rounded-xl border text-white">
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="flex items-center mt-2"><Briefcase className="mr-2" /> {job.job_type}</p>
              <p className="flex items-center"><MapPin className="mr-2" /> {job.location}</p>
              <p className="flex items-center"><IndianRupee className="mr-2" /> {job.salary_expected}</p>
              <div className="mt-3">
                <span className="text-sm">Required Skills: </span>
                <div className="flex flex-wrap mt-1">
                  {job.skills_required.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded-full mr-2">{skill}</span>
                  ))}
                </div>
              </div>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full">Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowJobs;
