import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { toggleTheme } from '../../Redux/Theme/themeSlice';
import axios from 'axios';
import { signoutSuccess } from '../../Redux/user/userSlice';

function Header() {

    //karan Ch*du
    /// helloot this the code
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
            const res = await axios.get("http://localhost:3000/api/v1/company/logout", { withCredentials: true });
            if(res.status==200){
                navigate('/auth');
                dispatch(signoutSuccess());
            }
        }catch (error) {
            console.log(error?.response?.data?.message || "Something went wrong.");
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
                <Link to="/" className="text-white text-2xl sm:text-3xl font-bold">
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
                            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                                <img
                                    src={currentUser?.profilePicture}
                                    alt={currentUser?.name}
                                    className="w-8 h-8 rounded-full object-cover cursor-pointer"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg overflow-hidden z-50">
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
