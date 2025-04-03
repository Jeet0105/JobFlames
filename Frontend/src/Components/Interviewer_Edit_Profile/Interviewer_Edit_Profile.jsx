import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../../Redux/user/userSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

function InterviewerEditProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
        phone: currentUser?.phone || '',
        specialization: currentUser?.specialization || '',
        experience: currentUser?.experience,
        linkedin: currentUser?.linkedInProfile || '',
        profilePicture: currentUser?.profilePicture || '',
    });

    const [image, setImage] = useState(currentUser?.profilePicture);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      console.log(formData)
    }, [formData])
    

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')) {
                setImage(URL.createObjectURL(file));
                setFormData({ ...formData, profilePicture: file });
            } else {
                toast.error('File should be in PNG, JPG, or JPEG format.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v1/interviewer/updateInterviewer`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (response?.data?.success) {
                dispatch(signInSuccess(response.data.data));
                toast.success(response.data.message);
                navigate('/profile/Interviewer');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">Edit Interviewer Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex flex-col items-center">
                        <label className="text-lg font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
                        <label className="w-32 h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full overflow-hidden mt-2 relative cursor-pointer">
                            <img src={image} alt="Profile" className="w-full h-full object-cover" />
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
                        </label>
                    </div>

                    {/* Input Fields */}
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Specialization</label>
                        <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
                        <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile</label>
                        <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white" />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InterviewerEditProfile;
