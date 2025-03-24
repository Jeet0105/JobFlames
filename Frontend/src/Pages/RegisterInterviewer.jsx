import { useState } from "react";
import axios from "axios";

const RegisterInterviewer = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        specialization: "",
        experience: "",
        availability: "",
        linkedInProfile: "",
    });

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await axios.post("http://localhost:3000/api/interviewers/register", formData, {
                withCredentials: true,
            });
            setMessage({ type: "success", text: response.data.message });
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
            setMessage({
                type: "error",
                text: error.response?.data?.message || "Registration failed!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Register Interviewer</h2>
            {message && (
                <p className={`p-2 text-center rounded ${message.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="number" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required className="w-full p-2 border rounded" />
                <input type="text" name="availability" placeholder="Availability (e.g., Weekends, Evenings)" value={formData.availability} onChange={handleChange} className="w-full p-2 border rounded" />
                <input type="url" name="linkedInProfile" placeholder="LinkedIn Profile (optional)" value={formData.linkedInProfile} onChange={handleChange} className="w-full p-2 border rounded" />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default RegisterInterviewer;
