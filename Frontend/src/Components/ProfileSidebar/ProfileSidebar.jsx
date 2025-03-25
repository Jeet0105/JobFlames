import { NavLink, useNavigate } from "react-router-dom";
import { HiUser, HiBriefcase, HiArrowSmRight } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signoutSuccess } from "../../Redux/user/userSlice";
import axios from "axios";

function ProfileSidebar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSignout = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/company/logout", { withCredentials: true });
            if (res.status === 200) {
                toast.success(res?.data?.message || "Logged out successfully!");
                dispatch(signoutSuccess());
                navigate('/auth');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed!");
            console.error("Logout Error:", error);
        }
    };

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
            <nav className="space-y-2">
                {/* Profile */}
                <SidebarItem to="/profile/JobSeeker" icon={HiUser} text="Profile" label={currentUser?.isAdmin ? "Admin" : "User"} />

                {/* Register Interviewer - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/registerinterviewer" icon={HiUser} text="Register Interviewer" />
                )}

                {/* Job Listings - Only for Company */}
                {currentUser?.role === "company" && (
                    <SidebarItem to={`/get-my-job/${currentUser?._id}`} icon={HiBriefcase} text="Listed Jobs" />
                )}

                {/* createjob - Only for company */}
                {currentUser?.role === "company" && (
                    <SidebarItem to='/createjob' icon={HiBriefcase} text="Create Jobs" />
                )}
                {currentUser?.role === "jobseeker" && (
                    <SidebarItem to='/getappiedjobs' icon={HiBriefcase} text="Applied Jobs" />
                )}
                {/* Sign Out */}
                <button 
                    onClick={handleSignout} 
                    className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 transition"
                >
                    <HiArrowSmRight className="w-5 h-5 mr-3" />
                    <span>Sign Out</span>
                </button>
            </nav>
        </aside>
    );
}

function SidebarItem({ to, icon: Icon, text, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${
                    isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"
                }`
            }
        >
            <Icon className="w-5 h-5 mr-3" />
            <span>{text}</span>
            {label && <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded">{label}</span>}
        </NavLink>
    );
}

export default ProfileSidebar;
