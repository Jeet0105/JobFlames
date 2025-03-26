import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { toggleTheme } from '../../Redux/Theme/themeSlice';
import axios from 'axios';
import { signoutSuccess } from '../../Redux/user/userSlice';
import Logo from '../../../public/Logo.png';
import { toast } from 'react-toastify';

function Header() {

    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const toggle = () => {
        setIsDarkMode(!isDarkMode);
        dispatch(toggleTheme());
    };

    const handleLogout = async () => {
        setDropdownOpen(false);
        try{
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/logout`, { withCredentials: true });
            if(res.status==200){
                navigate('/auth');
                toast.success(res?.data?.message)
                dispatch(signoutSuccess());
            }
        }catch (error) {
            toast.error(error?.response?.data?.message)
            // console.log(error?.response?.data?.message || "Something went wrong.");
          }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-[#1b3453] py-4 shadow-md">
            <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6">
                <Link to="/" className="text-white flex items-center gap-2 text-2xl sm:text-3xl font-bold">
                    <img src={Logo} alt="Logo Image" className='w-14 h-14'  />
                    <span className="text-white">JobFlames</span>
                </Link>
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="text-white text-lg hover:text-teal-300 transition duration-200 ease-in-out">Home</Link>
                    <Link to="/about" className="text-white text-lg hover:text-teal-300 transition duration-200 ease-in-out">About</Link>
                    <Link to="/contact" className="text-white text-lg hover:text-teal-300 transition duration-200 ease-in-out">Contact</Link>

                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggle}
                        className="text-white text-2xl transition duration-200 ease-in-out"
                    >
                        {isDarkMode ? <FaMoon /> : <FaSun />}
                    </button>

                    {/* Profile Dropdown */}
                    {currentUser ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center focus:outline-none space-x-4 p-3 rounded-lg shadow-md cursor-pointer  transition duration-300">
                                <img
                                    src={currentUser?.role === 'jobseeker' || currentUser?.role === 'interviewer' ? currentUser?.profilePicture : currentUser?.logo}
                                    alt={currentUser?.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-500 cursor-pointer"
                                />
                                <div className='flex flex-col items-start'>
                                    <div className='text-lg font-semibold text-white'>{currentUser?.name}</div>
                                    <div className='text-sm text-gray-400'>{currentUser?.email}</div>
                                </div>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/auth">
                            <button className="font-semibold text-white cursor-pointer px-7 py-3 rounded-xl bg-transparent border border-white hover:font-bold">
                                Sign In
                            </button>
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
