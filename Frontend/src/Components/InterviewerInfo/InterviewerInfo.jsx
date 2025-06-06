import { FaEnvelope, FaPhone, FaLinkedin, FaStar, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function InterviewerInfo() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar 
                    key={i} 
                    className={`text-xl ${i <= rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}`} 
                />
            );
        }
        return stars;
    };

    return (
        <div className="min-h-screen flex items-center justify-center ml-6 px-6 py-5">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700 relative">

                {/* Header: Profile Picture, Name, Experience, Rating */}
                <div className="flex justify-between md:flex-row items-center gap-6 border-b pb-6 mb-6 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                        <img
                            src={currentUser?.profilePicture}
                            alt="Profile"
                            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
                        />
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentUser?.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Specialization: {currentUser?.specialization}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Experience: {currentUser?.experience} {currentUser?.experience === 1 ? "year" : "years"}
                            </p>
                            <div className="flex items-center mt-2">
                                {renderStars(currentUser?.rating)}  
                                <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">
                                    ({currentUser?.rating}/5)
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={() => navigate(`/profile/edit-profile/${currentUser?._id}`)}
                        className="px-6 py-3 flex justify-center gap-3 items-center bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
                    >
                        <FaEdit /> <span>Edit</span>
                    </button>
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaEnvelope className="text-blue-600" />
                        <a href={`mailto:${currentUser?.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {currentUser?.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaPhone className="text-green-600" />
                        <span>{currentUser?.phone}</span>
                    </div>
                </div>

                {/* LinkedIn Profile */}
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">LinkedIn Profile</h2>
                    {currentUser?.linkedInProfile ? (
                        <a
                            href={currentUser?.linkedInProfile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-500 dark:hover:to-indigo-500 transition-all shadow-md"
                        >
                            <FaLinkedin className="mr-2" /> View Profile
                        </a>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No LinkedIn profile available</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default InterviewerInfo;
