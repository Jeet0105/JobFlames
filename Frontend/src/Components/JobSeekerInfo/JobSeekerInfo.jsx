import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaFileAlt, FaEdit,FaLink, FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function JobSeekerInfo() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    console.log('currentUser: ', currentUser);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-6 py-5">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700 relative">

                <div className="flex justify-between md:flex-row items-center gap-6 border-b pb-6 mb-6 dark:border-gray-700">
                    <div className='flex items-center gap-6'>
                        <div className="relative">
                            <img
                                src={currentUser?.profilePicture}
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentUser?.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">Experience: {currentUser?.experience} years</p>

                            <div className="flex items-center mt-2">
                                {renderStars(currentUser?.rating)}  
                                <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">({currentUser?.rating}/5)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => navigate(`/profile/edit-profile/${currentUser?._id}`)}
                            className="px-6 py-3 flex justify-center gap-3 items-center bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
                        >
                            <FaEdit className="text-center" /> <span>Edit</span>
                        </button>
                    </div>
                </div>


                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaEnvelope className="text-blue-600" />
                        <a href={`mailto:${currentUser?.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {currentUser?.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaPhone className="text-green-600" />
                        <span>{currentUser?.contact_no}</span>
                    </div>
                </div>


                {/* <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    {currentUser?.AllLinks?.map((linkItem, index) => (
                        <div key={index} className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                            {linkItem?.LinkLabel.toLowerCase().includes("github") ? (
                                <FaGithub className="text-gray-800 dark:text-gray-200" />
                            ) : linkItem.LinkLabel.toLowerCase().includes("linkedin") ? (
                                <FaLinkedin className="text-blue-700" />
                            ) : (
                                <FaLink className="text-gray-500 dark:text-gray-400" />
                            )}
                            <a
                                href={linkItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                            >
                                {linkItem.LinkLabel}
                            </a>
                        </div>
                    ))}
                </div> */}


                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Resume</h2>
                    {currentUser?.resumeUrl !== 'No Resume Url' ? (
                        <a
                            href={currentUser?.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-500 dark:hover:to-indigo-500 transition-all shadow-md"
                        >
                            <FaFileAlt className="mr-2" /> View Resume
                        </a>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No resume uploaded</p>
                    )}
                </div>
            </div>
        </div>
    );

};


export default JobSeekerInfo
