import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleNavigation = () => {
    if (!currentUser) {
      navigate("/auth");
    } else if (currentUser?.role === "jobseeker") {
      navigate("/showjob");
    } else if (currentUser?.role === "company") {
      navigate("/createjob");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-12 py-12">
      <div className="flex flex-col items-center justify-center text-center bg-[#1b3453] text-white py-12 rounded-lg shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Your Next Career Move!</h2>
        <p className="text-lg sm:text-xl mb-6">
          Explore opportunities, find your dream job, or hire the best talent, all in one place.
        </p>
        <div className="flex justify-center gap-6">
          <button
            onClick={handleNavigation}
            className="px-6 py-3 bg-[#254A74] rounded-lg hover:bg-[#13314d] transition duration-200 shadow-md hover:shadow-lg"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-[#13314d] transition duration-200 shadow-md hover:shadow-lg"
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-[#254A74] mb-4">Find Jobs</h3>
          <p className="text-gray-700">
            Search through thousands of job listings, apply to your ideal position, and get hired faster.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-[#254A74] mb-4">Hire Talent</h3>
          <p className="text-gray-700">
            Post your company&apos;s job openings and find the perfect candidates for your business needs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-2xl font-semibold text-[#254A74] mb-4">Career Resources</h3>
          <p className="text-gray-700">
            Access valuable resources like resume building tips, interview preparation, and career advice.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#254A74]">Ready to Take the Next Step?</h3>
        <p className="text-lg text-gray-600 mb-6">
          Whether you&apos;re looking for a job or hiring talent, we&apos;ve got the tools to help you succeed.
        </p>
      </div>
    </div>
  );
}

export default Home;
