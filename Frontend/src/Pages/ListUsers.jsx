import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"
import GetJobSeekers from "../Components/GetUsers/GetUsers"

function ListUsers() {
    return (
        <div className="flex max-h-[100%] min-h-screen">
            <div className="w-[18%]">
                <ProfileSidebar />
            </div>
            <div className="w-[85%] ml-9">
                <GetJobSeekers />
            </div>
        </div>
    )
}

export default ListUsers