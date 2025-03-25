import CreateJobCom from "../Components/CreateJob/CreateJobComp"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function CreateJob() {
  return (
    <div className="flex max-h-[100%] min-h-screen">
        <div className="w-[18%]">
        <ProfileSidebar />
        </div>
        <div className="w-[82%] overflow-y-auto">
          <CreateJobCom/>
        </div>
    </div>
  )
}

export default CreateJob