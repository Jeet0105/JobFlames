import { NavLink, useNavigate } from "react-router-dom";
import { HiUser, HiBriefcase, HiClipboardList, HiArrowSmRight } from "react-icons/hi";
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
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/company/logout`, { withCredentials: true });
            if (res.status === 200) {
                toast.success(res?.data?.message);
                dispatch(signoutSuccess());
                navigate('/auth');
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed!");
            console.error("Logout Error:", error);
        }
    };

    return (
        <aside className="w-full bg-gray-900 text-white h-full p-4">
            <nav className="space-y-2">
                {/* Profile */}
                <SidebarItem to="/profile/JobSeeker" icon={HiUser} text="Profile" label={currentUser?.isAdmin ? "Admin" : "User"} />

                {/* Register Interviewer - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/registerinterviewer" icon={HiUser} text="Register Interviewer" />
                )}

                {/* Job Listings */}
                <SidebarItem to="/profile?tab=jobs" icon={HiBriefcase} text="Job Listings" />

                {/* Applications */}
                <SidebarItem to="/profile?tab=applications" icon={HiClipboardList} text="Applications" />

                {/* Sign Out */}
                <div onClick={handleSignout} className="flex items-center p-3 cursor-pointer hover:bg-gray-800 rounded-lg">
                    <HiArrowSmRight className="w-5 h-5 mr-3" />
                    <span>Sign Out</span>
                </div>
            </nav>
        </aside>
    );
}

function SidebarItem({ to, icon: Icon, text, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"}`
            }
        >
            <Icon className="w-5 h-5 mr-3" />
            <span>{text}</span>
            {label && <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded">{label}</span>}
        </NavLink>
    );
}

export default ProfileSidebar;
