import React from 'react'
import { FaEdit, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function CompanyInfo() {

    const navigate = useNavigate();
    const currentUser = useSelector((state)=>state.user.currentUser);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-6 py-3">
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
                            onClick={() => navigate(`/company/edit-profile/${currentUser?._id}`)}
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
                        <span>{currentUser?.location}</span>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaGlobe className="text-blue-700" />
                        <a
                            href={currentUser?.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                            {currentUser?.website}
                        </a>
                    </div>
                </div>
    
                {/* Description Section */}
                <div className="border-b pt-6 dark:border-gray-700">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">About the Company</h2>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line mb-3">{currentUser?.description}</p>
                </div>
    
            </div>
        </div>
    );
    
}

export default CompanyInfo
