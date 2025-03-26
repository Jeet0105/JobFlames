import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AccessAccount from './Components/AccessAccount/AccessAccount';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';
import Home from './Pages/Home'
import About from './Pages/About';
import Contact from './Pages/Contact';
import CreateJob from './Pages/CreateJob';
import ShowJobs from './Pages/ShowJob';
import Profile from './Pages/Profile';
import JobSeekerInfo from './Components/JobSeekerInfo/JobSeekerInfo';
import JobDetail from './Pages/JobDetail';
import EditProfile from './Components/Edit-Profile/EditProfile';
import CompanyInfo from './Components/CompanyInfo/CompanyInfo';
import RegisterInterviewer from './Pages/RegisterInterviewer';
import { useSelector } from 'react-redux';
import CompanyJobs from './Pages/CompanyJobs';
import ApplicantJob from './Components/ApplicantJob/ApplicantJob';
import AppliedJobs from './Pages/AppliedJobs';
import ListCompanies from './Pages/ListCompanies';
import ListUsers from './Pages/ListUsers';
import ListApplications from './Pages/ListApplications';
import ListJobs from './Pages/ListJobs';
import Com_Edit_Profile from './Components/Com-Edit-Profile/Com_Edit_Profile';
import CreateSubscriptionPlan from './Components/CreateSubscriptionPlan/CreateSubscriptionPlan';
import SubscriptionPlans from './Components/SubscriptionPlan/SubscriptionPlan';
import GetCompanyJob from './Components/GetCompanyJob/GetCompanyJob';
import GetJobSeekers from './Components/GetUsers/GetUsers';
import GetApplications from './Components/GetApplication/GetApplication';
import GetAllJob from './Components/GetAllJob.jsx/GetAllJob';
import GetAppliedJobs from './Components/GetAppliedJobs/GetAppliedJobs';
import CreateJobCom from './Components/CreateJob/CreateJobComp';
import GetCompanies from './Components/GetCompanies/GetCompanies';
import GetInterviewer from './Components/GetInterviewer/GetInterviewer';
import InterviewerInfo from './Components/InterviewerInfo/InterviewerInfo';
import InterviewerEditProfile from './Components/Interviewer_Edit_Profile/Interviewer_Edit_Profile';

function App() {

  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<AccessAccount />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/showjob' element={<ShowJobs />} />
        <Route path='/profile' element={<Profile />} >
          {currentUser?.role === "jobseeker" ? (
            <Route index element={<Navigate to="JobSeeker" />} />
          ) : currentUser?.role === "interviewer" ? (
            <Route index element={<Navigate to="Interviewer" />} />
          ) : (
            <Route index element={<Navigate to="Company" />} />
          )}
          <Route path='JobSeeker' element={<JobSeekerInfo />} />
          <Route path='Company' element={<CompanyInfo />} />
          <Route path='Interviewer' element={<InterviewerInfo />} />
          <Route path='Create-Subscription' element={<CreateSubscriptionPlan />} />
          <Route path='edit-profile/:id' element={currentUser?.role === "jobseeker" ? (<EditProfile />) : currentUser?.role === "interviewer" ? (<InterviewerEditProfile/>) : (<Com_Edit_Profile />)} />
          {currentUser?.role === "company" && (
            <Route path="get-my-job/:id" element={<GetCompanyJob />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="getallcompanies" element={<GetCompanies />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="getallusers" element={<GetJobSeekers />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="getallapplications" element={<GetApplications />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="getalljobs" element={<GetAllJob />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="getallinterviewers" element={<GetInterviewer />} />
          )}
          {currentUser?.isAdmin && (
            <Route path="registerInterviewer" element={<RegisterInterviewer />} />
          )}
          {currentUser?.role === "company" && (
            <Route path="myjobdetail/:id" element={<ApplicantJob />} />
          )}
          {currentUser?.role === "company" && (
            <Route path='createjob' element={<CreateJobCom />} />
          )}
          {currentUser?.role === "jobseeker" && (
            <Route path='getappiedjobs' element={<GetAppliedJobs />} />
          )}
        </Route>
        <Route path="/job/:id" element={<JobDetail />} />
        {/* {currentUser?.role === "company" && (
          <Route path="/get-my-job/:id" element={<CompanyJobs />} />
        )} */}
        {/* {currentUser?.isAdmin && (
          <Route path="/getallcompanies" element={<ListCompanies />} />
        )} */}
        {/* {currentUser?.isAdmin && (
          <Route path="/getallusers" element={<ListUsers />} />
        )} */}
        {/* {currentUser?.isAdmin && (
          <Route path="/getallapplications" element={<ListApplications />} />
        )} */}
        {/* {currentUser?.isAdmin && (
          <Route path="/getalljobs" element={<ListJobs />} />
        )} */}
        {/* {currentUser?.role === "company" && (
          <Route path="/myjobdetail/:id" element={<ApplicantJob />} />
        )} */}
        {/* {currentUser?.role === "jobseeker" && (
          <Route path='/getappiedjobs' element={<AppliedJobs />} />
        )} */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
