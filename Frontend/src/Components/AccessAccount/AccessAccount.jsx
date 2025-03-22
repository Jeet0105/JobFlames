import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../Redux/user/userSlice';
import { toast } from 'react-toastify';

function AccessAccount() {
    const [isMoved, setIsMoved] = useState(false);
    const [isJobSeeker, setIsJobSeeker] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [contact_no, setContactno] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {
        setIsMoved(!isMoved);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (isMoved) {
                //Regristration
                if (isJobSeeker) {
                    //Job Seeker
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, { email, password,name,contact_no }, { withCredentials: true });
                    console.log(res.data);
                    setIsMoved(false);
                } else {
                    //Company
                    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/register`, { email, password,name,contact_no }, { withCredentials: true });
                    console.log(res.data);
                    setIsMoved(false);
                }
            }
            else {
                //Login
                const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/login`, { email, password }, { withCredentials: true });
                console.log(res.data);
                if (res?.status === 200){
                    toast.success(res?.data?.message);
                    dispatch(signInSuccess(res.data))
                    navigate("/");
                }
                else{
                    toast.error(res?.data?.message);
                }
            }
        } catch (error) {
            console.error("Error:", error);
            console.error("Error message:", error.message);
            console.error("Error response:", error.response);
            toast.error(error.response?.data?.message)
            // setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 sm:px-6 md:px-12 py-12">
            <div className="flex flex-col md:flex-row bg-white relative gap-10 w-full h-auto md:h-[85vh] rounded-lg overflow-hidden shadow-xl ">
                {/* Sign In Section */}
                <div
                    className={`w-full md:w-[50%] h-full px-8 rounded-lg transition-opacity duration-700
                    ${!isMoved ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    <div className="w-full h-full flex flex-col gap-6 justify-center">
                        <h2 className="text-[#254A74] text-2xl sm:text-3xl font-bold text-center">Sign In</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <InputField label="Email:" type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <InputField label="Password:" type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="submit"
                                className="w-full bg-[#1b3453] text-white p-4 rounded-lg mt-4 hover:hover:bg-[#254A74] focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200 ease-in-out"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Sign In"}
                            </button>
                        </form>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                </div>

                {/* Sign Up Section */}
                <div
                    className={`overflow-y-auto w-full md:w-[50%] h-full px-8 py-9 rounded-lg transition-opacity duration-700 custom-scrollbar
                    ${isMoved ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                >
                    <div className="w-full h-full flex flex-col gap-6">
                        <h2 className="text-[#254A74] text-2xl sm:text-3xl font-bold text-center">Sign Up</h2>
                        {/* User Type Selection */}
                        <div className="flex justify-center gap-4 mb-6">
                            <button
                                onClick={() => setIsJobSeeker(true)}
                                className={`px-4 py-2 rounded-lg ${isJobSeeker ? 'bg-[#1b3453]' : 'bg-[#3b72b0]'} text-white`}
                            >
                                Job Seeker
                            </button>
                            <button
                                onClick={() => setIsJobSeeker(false)}
                                className={`px-4 py-2 rounded-lg ${!isJobSeeker ? 'bg-[#1b3453]' : 'bg-[#3b72b0]'} text-white`}
                            >
                                Company
                            </button>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <InputField label="Email:" type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            {isJobSeeker ? (
                                <InputField label="Username:" type="text" id="username" placeholder="Enter your username" value={name} onChange={(e) => setName(e.target.value)} />
                            ) : (
                                <InputField label="Company Name:" type="text" id="companyName" placeholder="Enter your company name" value={name} onChange={(e) => setName(e.target.value)} />
                            )}
                            <InputField label="Contact No:" type="text" id="contactno" placeholder="Enter your contact no" value={contact_no} onChange={(e) => setContactno(e.target.value)} />
                            <InputField label="Password:" type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button
                                type="submit"
                                className="w-full bg-[#1b3453] text-white p-4 rounded-lg mt-4 hover:hover:bg-[#254A74] focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200 ease-in-out"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : (isJobSeeker ? 'Register as Job Seeker' : 'Register as Company')}
                            </button>
                        </form>
                        {error && <div className="text-red-500 mt-2">{error}</div>}
                    </div>
                </div>

                {/* Transition Section */}
                <div
                    className={`bg-[#1b3453] w-full md:w-[40%] h-full absolute top-0 md:right-[40%] duration-1000 ease-in-out transform
                    ${isMoved ? "translate-x-[-50%]" : "translate-x-full"}`}
                >
                    {isMoved ? <div className="px-8 flex flex-col gap-5 items-center justify-center h-full text-white transition-all duration-1000 ease-in-out">
                        <p className="text-xl sm:text-2xl font-bold">Welcome Back</p>
                        <p className='text=sm sm:text-sm'>Welcome back! Continue your journey to find your dream job or the perfect candidate for your team.</p>
                        <input type='button'
                            onClick={handleClick}
                            className="font-semibold text-white cursor-pointer px-7 py-3 rounded-xl bg-transparent border border-white"
                            value="Sign In"
                        />
                    </div> : <div className="px-8 flex flex-col gap-5 items-center justify-center h-full text-white transition-all duration-1000 ease-in-out">
                        <p className="text-xl sm:text-2xl font-bold">Start New Journey, With Us!</p>
                        <p className="text-sm sm:text-base">Connecting talent with opportunities! Sign up to find your dream job or hire the best professionals for your company.</p>
                        <input type='button'
                            onClick={handleClick}
                            className="font-semibold text-white cursor-pointer px-7 py-3 rounded-xl bg-transparent border border-white"
                            value="Sign up"
                        />
                    </div>}
                </div>
            </div>
        </div>
    );
}

function InputField({ label, type, id, placeholder, value, onChange }) {
    return (
        <div className="flex flex-col gap-3">
            <label htmlFor={id} className="text-[#254A74] font-medium">{label}</label>
            <input
                id={id}
                type={type}
                className="p-4 bg-transparent border-b-2 border-[#254A74] focus:outline-none transition duration-200 ease-in-out text-[#254A74] placeholder:text-blue-900"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required
            />
        </div>
    );
}

export default AccessAccount;
