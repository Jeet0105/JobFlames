import { FaEdit, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaGithub, FaLinkedin, FaLink } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function CompanyInfo() {

    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);
    console.log('currentUser: ', currentUser);


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-6 py-10">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700 relative">

                {/* Header - Logo & Company Name */}
                <div className="flex justify-between md:flex-row items-center gap-6 border-b pb-6 mb-6 dark:border-gray-700">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <img
                                src={currentUser?.logo}
                                alt="Company Logo"
                                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{currentUser?.name}</h1>
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

                {/* Contact Details */}
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

                {/* Location & Website */}
                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaMapMarkerAlt className="text-red-600" />
                        <span>{currentUser?.location || "Not Provided"}</span>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaGlobe className="text-blue-700" />
                        {currentUser?.website ? (
                            <a
                                href={currentUser.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {currentUser.website}
                            </a>
                        ) : (
                            <span>Not Provided</span>
                        )}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
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
                                href={linkItem.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                            >
                                {linkItem.LinkLabel}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Industry Type */}
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        Industry Type
                    </h2>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                        </svg>
                        <span>{currentUser?.industry_type || <span className="italic text-gray-500">Not Provided</span>}</span>
                    </div>
                </div>

                {/* Subscription Plan */}
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Subscription Plan
                    </h2>
                    {currentUser?.Subscription_Plan ? (
                        <div className="space-y-3">
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Plan: <span className="font-semibold text-gray-800 dark:text-gray-200">{currentUser.Subscription_Plan.name || "Unknown Plan"}</span></span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>Start Date: <span className="font-semibold text-gray-800 dark:text-gray-200">{currentUser.subscription_start || "Not Started"}</span></span>
                            </div>
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>End Date: <span className="font-semibold text-gray-800 dark:text-gray-200">{currentUser.subscription_end || "Not Ended"}</span></span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                            <span>No active subscription</span>
                        </div>
                    )}
                </div>



                <div className="border-b pt-6 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">About the Company</h2>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-3">
                        {currentUser?.description || "No description provided."}
                    </p>
                </div>

            </div>
        </div>
    );

}

export default CompanyInfo
