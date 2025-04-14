import { NavLink, useNavigate } from "react-router-dom";
import { HiUser,HiArrowSmRight } from "react-icons/hi";
import { 
    FaUsers, FaUserTie, FaBriefcase, FaFileAlt, FaUserPlus, 
    FaBuilding, FaClipboardList, FaPlusCircle, FaCheckCircle, FaCalendarCheck 
  } from "react-icons/fa";
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
        <aside className="w-64 bg-gray-900 text-white min-h-[100%] p-4">
            <nav className="space-y-2">
                {/* Profile */}
                <SidebarItem to={currentUser?.role === "jobseeker" ? "/profile/JobSeeker" : currentUser?.role === "interviewer" ? "/profile/Interviewer" : "/profile/Company"} icon={HiUser} text="Profile" label={currentUser?.role === "jobseeker" ? (currentUser?.isAdmin ? "Admin" : "User") : currentUser?.role === "interviewer" ? "Interviewer" : "Company" } />

                {/* Get Companies - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/getallcompanies" icon={FaBuilding} text="Get Companies" />
                )}

                {/* Get Users - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/getallusers" icon={FaUsers} text="Get Users" />
                )}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/getallinterviewers" icon={FaUserTie} text="Get Interviewer" />
                )}
                {/* Get Jobs - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/getalljobs" icon={FaBriefcase} text="Get Jobs" />
                )}
                

                {/* Get application - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/getallapplications" icon={FaFileAlt} text="Get Applications" />
                )}

                {/* Register Interviewer - Only for Admins */}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/registerInterviewer" icon={FaUserPlus} text="Register Interviewer" />
                )}

                {/* create subscription - only for admin */}
                {/* {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/createSubscription" icon={FaRegCreditCard} text="Create Subscription" />
                )}
                {currentUser?.isAdmin && (
                    <SidebarItem to="/profile/subscriptionPlan" icon={FaRegCreditCard} text="Subscription Plans" />
                )} */}
                {/* Job Listings - Only for Company */}
                {currentUser?.role === "company" && (
                    <SidebarItem to={`/profile/get-my-job/${currentUser?._id}`} icon={FaClipboardList} text="Listed Jobs" />
                )}

                {/* createjob - Only for company */}
                {currentUser?.role === "company" && (
                    <SidebarItem to='/createjob' icon={FaPlusCircle} text="Create Jobs" />
                )}

                {/* Schedule Interview - interviewer */}
                {currentUser?.role === "interviewer" && (
                    <SidebarItem to='/profile/scheduleInterview' icon={FaCalendarCheck} text="Schedule Interview" />
                )}

                {/* Get Schedule Interview - interviewer */}
                {currentUser?.role === "interviewer" && (
                    <SidebarItem to='/profile/getScheduleInterview' icon={FaCalendarCheck} text="Get Scheduled Interview" />
                )}

                {/* Get Completed Interview - interviewer */}
                {currentUser?.role === "interviewer" && (
                    <SidebarItem to='/profile/getCompletedInterview' icon={FaCalendarCheck} text="Get Completed Interview" />
                )}

                {currentUser?.role === "jobseeker" && !currentUser?.isAdmin && (
                    <SidebarItem to='/profile/getappiedjobs' icon={FaCheckCircle} text="Applied Jobs" />
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
                `flex items-center p-3 rounded-lg transition ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800 text-gray-300"
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
