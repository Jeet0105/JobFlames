import GetCompanies from "../Components/GetCompanies/GetCompanies"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function ListCompanies() {
    return (
        <div className="flex max-h-[100%] min-h-screen">
            <div className="w-[18%]">
                <ProfileSidebar />
            </div>
            <div className="w-[85%] ml-9">
                <GetCompanies />
            </div>
        </div>
    )
}

export default ListCompanies