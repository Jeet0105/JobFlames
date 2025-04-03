import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { signInSuccess } from '../../Redux/user/userSlice';
import { toast } from 'react-toastify';

function EditProfile() {
  console.log("AA");
    
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    profilePicture: currentUser?.profilePicture || "",
    contact_no: currentUser?.contact_no || "",
    experience: currentUser?.experience || "",
    resumeUrl: currentUser?.resumeUrl || "",
    AllLinks: currentUser?.AllLinks || [],
  });

  // Cleanup object URLs on component unmount
  useEffect(() => {
    return () => {
      if (formData.profilePicture instanceof File) {
        URL.revokeObjectURL(formData.profilePicture);
      }
      if (formData.resumeUrl instanceof File) {
        URL.revokeObjectURL(formData.resumeUrl);
      }
    };
  }, [formData]);

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setFormData({ ...formData, resumeUrl: file });
      } else {
        alert('Please upload a valid PDF file.');
      }
    }
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...formData.AllLinks];
    updatedLinks[index][field] = value;
    setFormData({ ...formData, AllLinks: updatedLinks });
  };

  const addNewLink = () => {
    setFormData({
      ...formData,
      AllLinks: [...formData.AllLinks, { LinkLabel: "", link: "" }],
    });
  };

  const removeLink = (index) => {
    const updatedLinks = formData.AllLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, AllLinks: updatedLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('_id', currentUser._id);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('contact_no', formData.contact_no);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('AllLinks', formData.AllLinks);

      if (formData.profilePicture instanceof File) {
        formDataToSend.append('profilePicture', formData.profilePicture);
      }

      if (formData.resumeUrl instanceof File) {
        formDataToSend.append('resumeUrl', formData.resumeUrl);
      }

      const response = await axios.put(
        'http://localhost:3000/api/v1/user/updateJobSeeker',
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      if (response?.data?.success) {
        dispatch(signInSuccess(response?.data?.data));
        toast.success(response?.data?.message);
        navigate("/profile/JobSeeker");
      } else {
        toast.error(response?.data?.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Edit Profile</h2>
          <p className="text-gray-600 dark:text-gray-300">Update your personal and professional information.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Profile Picture</label>
            <div className="w-40 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full overflow-hidden relative cursor-pointer hover:border-blue-500 transition-all">
              <img
                src={formData.profilePicture instanceof File ? URL.createObjectURL(formData.profilePicture) : formData.profilePicture || "/default-profile.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleFileChange(e, "profilePicture")}
                accept="image/*"
              />
            </div>
          </div>

          {/* Resume Section */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Resume</label>
            {
              currentUser?.resumeUrl !== "No resume uploaded" ? (
                <a
                  href={currentUser.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Current Resume
                </a>
              ) : (
                <p className="text-gray-500">No resume uploaded</p>
              )
            }

            <input
              type="file"
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white cursor-pointer hover:border-blue-500 transition-all"
              onChange={handlePDFChange}
              accept=".pdf,.doc,.docx"
            />
          </div>

          {/* Other Inputs */}
          <div className="space-y-6">
            <div className='flex gap-4 items-center w-full'>
              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className='flex gap-4 items-center w-full'>
              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={(e) => setFormData({ ...formData, contact_no: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Social Links</h3>
            {formData.AllLinks.map((link, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-4 items-center mb-4">
                <input
                  type="text"
                  placeholder="Label"
                  value={link.LinkLabel}
                  onChange={(e) => handleLinkChange(index, "LinkLabel", e.target.value)}
                  className="w-full md:w-1/3 p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={link.link}
                  onChange={(e) => handleLinkChange(index, "link", e.target.value)}
                  className="w-full md:w-2/3 p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="w-full md:w-auto p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                  aria-label="Remove link"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addNewLink}
              className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <FaPlus /> Add Link
            </button>
          </div>

          {/* Save Changes Button */}
          <button
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-lg font-semibold disabled:opacity-70"
            disabled={loading}
          >
            {loading ? "Loading..." : "Update Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
