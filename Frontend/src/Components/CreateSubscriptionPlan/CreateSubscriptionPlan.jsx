import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function CreateSubscriptionPlan() {
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        duration: "",
        job_post_limit: "",
        description: "",
        backgroundImageUrl: "",
        features: [],
    });
    const navigate = useNavigate();
    const [featureInput, setFeatureInput] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [loading,setLoading] = useState(false);
    const currentUser = useSelector((state)=>state.user.currentUser);
    useEffect(() => {
        if (!currentUser?.isAdmin){
            navigate("/")
        }
    }, [])



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setFormData({ ...formData, backgroundImageUrl: file });
        }
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData({ ...formData, features: [...formData.features, featureInput] });
            setFeatureInput("");
        }
    };

    const removeFeature = (index) => {
        const updatedFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: updatedFeatures });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log("Submitted Data:", formData);
        try {
            setLoading(true);
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/subscription/create-subscription`,{
                name : formData?.name,
                price : formData?.price,
                duration : formData?.duration,
                job_post_limit : formData?.job_post_limit,
                description : formData?.description,
                profilePicture : formData?.backgroundImageUrl,
                features : formData?.features
            },{
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })
            .then(function (response){
                console.log('response: ', response);
                if (response?.data?.success) {
                    toast.success(response?.data?.message);
                    navigate("/profile");   
                }
                else{
                    toast.error(response?.data?.message);
                }
            })
            .catch(function (error){
                console.log('error: ', error);
                toast.error(error?.response?.data?.message);
            })
            .finally(function (){
                setLoading(false);
            })
        } catch (error) {
            console.log("Error while creating subscription plan:", error);
            toast.error(error?.response?.data?.message);
        }

    };

    return (
        <div className="min-h-screen flex flex-col items-center ml-6 bg-gray-100 dark:bg-gray-900 p-6">
            {/* Background Image Upload (Full Width) */}
            <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-10">
                    Create Subscription Plan
                </h2>
                <hr className="border-gray-500 mb-10" />

                <div className="mb-6">
                    <div className="w-full flex justify-center items-center mb-5">
                        {imagePreview && (
                            <img src={imagePreview} alt="Preview" className="mt-3 w-56 h-56 object-cover rounded-lg shadow-md" />
                        )}
                    </div>
                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                        Background Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side Fields */}
                    <div className="space-y-4">
                        {[
                            { label: "Plan Name", name: "name", type: "text" },
                            { label: "Price (Rupees)", name: "price", type: "number" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Right Side Fields */}
                    <div className="space-y-4">
                        {[
                            { label: "Duration (Days)", name: "duration", type: "number" },
                            { label: "Job Post Limit", name: "job_post_limit", type: "number" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                                    {field.label}
                                </label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Description (Full Width) */}
                    <div className="col-span-2">
                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    {/* Features List (Full Width) */}
                    <div className="col-span-2">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Features</h3>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Add a feature..."
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                onClick={addFeature}
                                className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                            >
                                <FaPlus />
                            </button>
                        </div>

                        <div className="mt-4 space-y-2">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                    <button onClick={() => removeFeature(index)} className="text-red-500 hover:text-red-600">
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2">
                        <input
                            type="submit"
                            className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold"
                            value = {loading ? "Loading..." : "Create Plan"}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
