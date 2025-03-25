import GetApplications from "../Components/GetApplication/GetApplication"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function ListApplications() {
    return (
        <div className="flex max-h-[100%] min-h-screen">
            <div className="w-[18%]">
                <ProfileSidebar />
            </div>
            <div className="w-[85%] ml-9">
                <GetApplications />
            </div>
        </div>
    )
}

export default ListApplications