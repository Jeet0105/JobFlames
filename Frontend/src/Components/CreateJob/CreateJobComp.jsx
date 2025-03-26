import { useState } from "react";
import { Briefcase, MapPin, IndianRupee, Layers, List } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CreateJobCom() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary_expected: "",
    experience: "",
    job_type: "full-time",
    skills_required: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const jobTypes = ["full-time", "part-time", "contract", "internship"];
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const addSkills = () => {
    if (!skillInput.trim()) return;
    
    const newSkills = skillInput
      .split(",")
      .map(skill => skill.trim())
      .filter(skill => skill !== "");
    
    if (newSkills.length > 0) {
      setFormData(prev => ({
        ...prev,
        skills_required: [...new Set([...prev.skills_required, ...newSkills])]
      }));
      setSkillInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkills();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills_required: prev.skills_required.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate form
    if (!formData.title.trim()) {
      setError("Job title is required");
      return;
    }
    if (!formData.description.trim()) {
      setError("Job description is required");
      return;
    }
    if (formData.skills_required.length === 0) {
      setError("Please add at least one skill");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:3000/api/v1/company/post-job`, formData, {
        withCredentials: true,
      });

      if (res.status === 201) {
        setSuccess("Job posted successfully!");
        toast.success("Job posted successfully!");
        setFormData({
          title: "",
          description: "",
          location: "",
          salary_expected: "",
          experience: "",
          job_type: "full-time",
          skills_required: [],
        });
        setSkillInput("");
      } else {
        toast.error(res?.data?.message);
        setError(res?.data?.message || "Error posting job");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setError(error?.response?.data?.message || "Something went wrong.");
    }
  };

  if (!currentUser || currentUser?.role !== "company") {
    navigate("/");
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen my-11">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Post a New Job
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
            <Briefcase className="text-gray-500 mr-3" />
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 bg-gray-50 outline-none text-gray-700 min-h-[150px]"
            required
          />

          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
            <MapPin className="text-gray-500 mr-3" />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
              required
            />
          </div>

          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
            <IndianRupee className="text-gray-500 mr-3" />
            <input
              type="number"
              name="salary_expected"
              placeholder="Expected Salary (INR ₹)"
              value={formData.salary_expected}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
              required
              min="0"
            />
          </div>

          <div className="flex items-center border rounded-lg p-3 bg-gray-50">
            <Layers className="text-gray-500 mr-3" />
            <input
              type="number"
              name="experience"
              placeholder="Experience Required (in years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full bg-transparent outline-none text-gray-700"
              required
              min="0"
              step="0.5"
            />
          </div>

          <select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 bg-gray-50 text-gray-700 outline-none"
            required
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
              <List className="text-gray-500 mr-3" />
              <input
                type="text"
                placeholder="Add skills (separate by comma or press Enter)"
                value={skillInput}
                onChange={handleSkillInputChange}
                onKeyDown={handleKeyDown}
                onBlur={addSkills}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
            {formData.skills_required.length > 0 && (
              <div className="flex flex-wrap gap-2 p-2">
                {formData.skills_required.map((skill) => (
                  <span 
                    key={skill} 
                    className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                    <button 
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Remove ${skill}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJobCom;