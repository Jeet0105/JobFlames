import GetAppliedJobs from "../Components/GetAppliedJobs/GetAppliedJobs"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function AppliedJobs() {
    return (
        <div className="flex max-h-[100%] min-h-screen">
            <div className="w-[18%]">
                <ProfileSidebar />
            </div>
            <div className="w-[85%] ml-9">
                <GetAppliedJobs />
            </div>
        </div>
    )
}

export default AppliedJobs