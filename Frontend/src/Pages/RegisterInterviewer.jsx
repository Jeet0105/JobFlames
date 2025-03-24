import { useState } from "react";
import { User, Mail, Lock, Phone, Briefcase, Calendar, Clock, Linkedin } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterInterviewer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        experience: "",
        linkedInProfile: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/registerInterviewer", formData, {
                withCredentials: true,
            });
            toast.success(response.data.message);
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                specialization: "",
                experience: "",
                availability: "",
                linkedInProfile: "",
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg bg-[#1b3453] shadow-lg rounded-2xl p-8 m-8">
                <h2 className="text-3xl font-bold text-center text-white mb-6">Register Interviewer</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField icon={User} type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                    <InputField icon={Mail} type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    <InputField icon={Lock} type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                    <InputField icon={Phone} type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
                    <InputField icon={Briefcase} type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} />
                    <InputField icon={Calendar} type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} />
                    <InputField icon={Linkedin} type="url" name="linkedInProfile" placeholder="LinkedIn Profile (optional)" value={formData.linkedInProfile} onChange={handleChange} />

                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ icon: Icon, ...props }) => (
    <div className="flex items-center border rounded-lg p-3 bg-gray-50">
        <Icon className="text-gray-500 mr-3" />
        <input {...props} className="w-full bg-transparent outline-none text-gray-700" required/>
    </div>
);

export default RegisterInterviewer;
