import { useEffect, useState } from "react";
import { User, Mail, Lock, Phone, Briefcase, Calendar, Linkedin } from "lucide-react";
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


    useEffect(() => {
        console.log(formData)
    }, [formData])
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData?.name==='' || formData?.email==='' || formData?.password==='' || formData?.phone==='' || formData?.specialization==='' || formData?.linkedInProfile===''){
            setLoading(false);
            return toast.error("Please full fill all fields");
        }

        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/registerInterviewer", formData, {
                withCredentials: true,
            });
            toast.success(response?.data?.message);
            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                specialization: "",
                experience: "",
                linkedInProfile: "",
            });
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
          className={`overflow-y-auto w-full md:w-[50%] h-full m-auto px-8 py-9 rounded-lg transition-opacity duration-700 custom-scrollbar opacity-100 dark:text-white bg-white dark:bg-gray-900`}
        >
          <div className="w-full h-full flex flex-col gap-6">
            <h2 className="text-[#254A74] dark:text-gray-100 text-2xl sm:text-3xl font-bold text-center">
              Sign Up as Interviewer
            </h2>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, formData)}>
              <InputField
                label="Full Name:"
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={formData?.name}
                onChange={handleChange}
              />
              <InputField
                label="Email:"
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleChange}
              />
              <InputField
                label="Phone Number:"
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                value={formData?.phone}
                onChange={handleChange}
              />
              <InputField
                label="Password:"
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData?.password}
                onChange={handleChange}
              />
              <InputField
                label="Experience (years):"
                type="number"
                id="experience"
                placeholder="Enter your experience in years"
                value={formData?.experience}
                onChange={handleChange}
              />
              <InputField
                label="specialization"
                type="text"
                id="specialization"
                placeholder="Enter your specialization (e.g., python, mern, php)"
                value={formData?.specialization}
                onChange={handleChange}
              />
              <InputField
                label="LinkedIn Profile:"
                type="url"
                id="linkedInProfile"
                placeholder="Enter your LinkedIn profile URL"
                value={formData?.linkedInProfile}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="w-full bg-[#1b3453] dark:bg-gray-700 text-white p-4 rounded-lg mt-4 hover:bg-[#254A74] dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200 ease-in-out"
                disabled={loading}
              >
                {loading ? "Loading..." : "Register as Interviewer"}
              </button>
            </form>
          </div>
        </div>
      );
      
};

function InputField({ label, type, id, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={id} className="text-[#254A74] dark:text-gray-100 font-medium">{label}</label>
            <input
                id={id}
                type={type}
                className="p-4 bg-transparent border-b-2 border-[#254A74] dark:border-gray-100 focus:outline-none transition duration-200 ease-in-out text-[#254A74] dark:text-gray-100 dark:placeholder:text-gray-200 placeholder:text-blue-900"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={id}
                required
            />
        </div>
    );
}

export default RegisterInterviewer;
