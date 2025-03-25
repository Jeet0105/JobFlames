import GetAllJob from "../Components/GetAllJob.jsx/GetAllJob"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function ListJobs() {
    return (
        <div className="flex max-h-[100%] min-h-screen">
            <div className="w-[18%]">
                <ProfileSidebar />
            </div>
            <div className="w-[85%] ml-9">
                <GetAllJob />
            </div>
        </div>
    )
}

export default ListJobs