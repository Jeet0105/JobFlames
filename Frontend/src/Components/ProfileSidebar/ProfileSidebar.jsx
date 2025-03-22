import { NavLink, useLocation } from "react-router-dom";
import { HiChartPie, HiUser, HiBriefcase, HiClipboardList, HiArrowSmRight } from "react-icons/hi";
import { useSelector } from "react-redux";

const handleSignout = async () => {

}

function ProfileSidebar() {
    const location = useLocation();
    const currentUser = useSelector((state) => state.user.currentUser);

    return (
        <aside className="w-full bg-gray-900 text-white h-full p-4">
            <nav className="space-y-2">
                {/* {currentUser.isAdmin && (
                    <SidebarItem to="/profile?tab=dash" active={tab === "dash" || !tab} icon={HiChartPie} text="profile" />
                )} */}
                <SidebarItem
                    to="/profile/JobSeeker"
                    icon={HiUser}
                    text="Profile"
                    label={currentUser.isAdmin ? "Admin" : "User"}
                />
                <SidebarItem to="/profile?tab=jobs"  icon={HiBriefcase} text="Job Listings" />
                <SidebarItem to="/profile?tab=applications"  icon={HiClipboardList} text="Applications" />
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
            className={({isActive})=>`flex items-center p-3 rounded-lg transition ${isActive ? "bg-blue-600" : "hover:bg-gray-800"
                }`}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span>{text}</span>
            {label && <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded">{label}</span>}
        </NavLink>
    );
}

export default ProfileSidebar;
