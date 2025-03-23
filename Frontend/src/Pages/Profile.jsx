import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"
import { Outlet } from "react-router"


function Profile() {
  return (
    <div className="flex max-h-[100%] min-h-screen max-h-screen">
        <div className="w-[18%]">
        <ProfileSidebar />
        </div>
        <div className="w-[82%] overflow-y-auto">
          <Outlet/>
        </div>
    </div>
  )
}

export default Profile