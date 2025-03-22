import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaFileAlt, FaEdit } from "react-icons/fa";

function JobSeekerInfo() {
    const [profileData, setProfileData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact_no: '+1234567890',
        resume_url: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',  
        resumeFile: null, 
        experience: '5',
        profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
        github: 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf',
        linkedin: "https://morth.nic.in/sites/default/files/dd12-13_0.pdf"

    });

   
    // const handleProfilePictureChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileData({
    //             ...profileData,
    //             profilePicture: URL.createObjectURL(file),
    //         });
    //     }
    // };

 
    // const handleResumeURLChange = (e) => {
    //     const url = e.target.value;
    //     setProfileData({
    //         ...profileData,
    //         resume_url: url, 
    //         resumeFile: null,
    //     });
    // };

    // const handleResumeFileUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfileData({
    //             ...profileData,
    //             resume_url: URL.createObjectURL(file), 
    //             resumeFile: file, 
    //         });
    //     }
    // };

    // const handleFieldChange = (e) => {
    //     const { name, value } = e.target;
    //     setProfileData({
    //         ...profileData,
    //         [name]: value,
    //     });
    // };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 px-6 py-5">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 border border-gray-200 dark:border-gray-700 relative">

                <div className="flex justify-between md:flex-row items-center gap-6 border-b pb-6 mb-6 dark:border-gray-700">
                    <div className='flex items-center gap-6'>
                        <div className="relative">
                            <img
                                src={profileData.profilePicture}
                                alt="Profile"
                                className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{profileData.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400">Experience: {profileData.experience} years</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => navigate("/edit-profile")}
                            className="px-6 py-3 flex justify-center gap-3 items-center bg-blue-600 dark:bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 transition-all"
                        >
                            <FaEdit className="text-center" /> <span>Profile</span>
                        </button>
                    </div>
                </div>

          
                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaEnvelope className="text-blue-600" />
                        <a href={`mailto:${profileData.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {profileData.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaPhone className="text-green-600" />
                        <span>{profileData.contact_no}</span>
                    </div>
                </div>

              
                <div className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 mb-6">
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaGithub className="text-gray-800 dark:text-gray-200" />
                        <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            GitHub Profile
                        </a>
                    </div>
                    <div className="flex items-center gap-3 border-b pb-3 dark:border-gray-700">
                        <FaLinkedin className="text-blue-700" />
                        <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            LinkedIn Profile
                        </a>
                    </div>
                </div>

       
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Resume</h2>
                    {profileData.resume_url ? (
                        <a
                            href={profileData.resume_url}
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
