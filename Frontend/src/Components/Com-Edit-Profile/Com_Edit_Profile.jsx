import { useEffect } from 'react'
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess } from '../../Redux/user/userSlice';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';

function Com_Edit_Profile() {
  const industryOptions = [
    "Information Technology (IT)",
    "Software Development",
    "Cybersecurity",
    "Cloud Computing",
    "Artificial Intelligence & Machine Learning",
    "Banking & Financial Services",
    "Insurance",
    "Hospitals & Healthcare",
    "Biotechnology",
    "E-Learning",
    "Automotive",
    "Construction & Infrastructure",
    "Online Marketplaces",
    "Digital Marketing",
    "Film & Television",
    "Gaming & Esports",
    "Hotels & Resorts",
    "Airlines",
  ];
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    website: currentUser?.website || "",
    description: currentUser?.description || "",
    location: currentUser?.location || "",
    industry_type: currentUser?.industry_type || "",
    profilePicture: currentUser?.logo || "",
    contact_no: currentUser?.contact_no || "",
    AllLinks: currentUser?.AllLinks || [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(currentUser?.logo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  useEffect(() => {
    console.log(formData)
  }, [formData])
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file?.name?.endsWith(".png") || file?.name?.endsWith(".jpg") || file?.name?.endsWith("jepg")){
        setImage(URL.createObjectURL(file))
        setFormData({ ...formData, profilePicture: file });
      }
      else{
        return toast.error("FIle should be of png, jpg, jpeg");
      }
    }
  };

  const handleLinkChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      AllLinks: prev.AllLinks.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      ),
    }));
  };

  const addNewLink = () => {
    setFormData({ ...formData, AllLinks: [...formData.AllLinks, { LinkLabel: "", Link: "" }] });
  };

  const removeLink = (index) => {
    const updatedLinks = formData.AllLinks.filter((_, i) => i !== index);
    setFormData({ ...formData, AllLinks: updatedLinks });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Handle submit")
    console.log('currentUser.role: ', currentUser?.role);
    if (currentUser?.role === "company") {
      console.log("in if statement")
      setLoading(true);
      await axios.put(`http://localhost:3000/api/v1/company/updateCompany`,{
        name : formData?.name,
        email : formData?.email,
        profilePicture : formData?.profilePicture,
        contact_no : formData?.contact_no,
        website : formData?.website,
        description : formData?.description || '',
        location : formData?.location,
        industry_type : formData?.industry_type,
        AllLinks : formData?.AllLinks
      },{
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      .then(function (response){
        console.log('response: ', response);
        if (response?.data?.success) {
          dispatch(signInSuccess(response?.data?.data));
          toast.success(response?.data?.message);
          navigate("/profile/Company");
        }else{
          toast.error(response?.data?.message);
        }
      })
      .catch(function (error){
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(function (){
        setLoading(false)
      })
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl overflow-hidden">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Company Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Logo Image */}
          <div className="flex flex-col items-center">
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Company Logo</label>
            <div className="w-40 h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-full overflow-hidden relative cursor-pointer hover:border-blue-500 transition-all">
              <img src={image} alt="Company Logo" className="w-full h-full object-cover" />
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} />
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Industry Type
              </label>
              <input
                type="text"
                name="industry_type"
                list="industryList"
                value={formData.industry_type}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Select Industry Type"
              />
              <datalist id="industryList">
                {industryOptions.map((industry, index) => (
                  <option key={index} value={industry} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Contact Number</label>
              <input
                type="text"
                name="contact_no"
                value={formData.contact_no}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
            ></textarea>
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
                  className="w-full md:w-1/3 p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={link.Link}
                  onChange={(e) => handleLinkChange(index, "Link", e.target.value)}
                  className="w-full md:w-2/3 p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => removeLink(index)} className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <FaTrash />
                </button>
              </div>
            ))}
            <button type="button" onClick={addNewLink} className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2">
              <FaPlus /> Add Link
            </button>
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
            value={loading ? "Loading..." : "Update Profile"}
          />
        </form>
      </div>
    </div>
  );

}

export default Com_Edit_Profile
