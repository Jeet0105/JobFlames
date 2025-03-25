import GetCompanyJob from "../Components/GetCompanyJob/GetCompanyJob"
import ProfileSidebar from "../Components/ProfileSidebar/ProfileSidebar"

function CompanyJobs() {
  return (
    <div className="flex max-h-[100%] min-h-screen">
        <div className="w-[18%]">
        <ProfileSidebar />
        </div>
        <div className="w-[85%] ml-9">
          <GetCompanyJob/>
        </div>
    </div>
  )
}

export default CompanyJobs