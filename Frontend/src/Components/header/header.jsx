import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState } from 'react';
import { toggleTheme } from '../../Redux/Theme/themeSlice';

function Header() {
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggle = () => {
        setIsDarkMode(!isDarkMode);
        dispatch(toggleTheme());
    };

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

                    <button
                        onClick={toggle}
                        className="text-white text-2xl transition duration-200 ease-in-out"
                    >
                        {isDarkMode ? <FaMoon /> : <FaSun />} {/* Toggle icon */}
                    </button>

                    {/* Profile or Sign In Button */}
                    {
                        currentUser ? (
                            <div className="flex items-center space-x-3">
                                <img
                                    src={currentUser?.profilePicture}
                                    alt={currentUser?.name}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </div>
                        ) : (
                            <Link to="/auth">
                                <button className="font-semibold text-white cursor-pointer px-7 py-3 rounded-xl bg-transparent border border-white hover:font-bold">Sign In</button>
                            </Link>
                        )
                    }
                </nav>
            </div>
        </header>
    );
}

export default Header;
