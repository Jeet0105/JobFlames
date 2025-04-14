import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AccessAccount from './Components/AccessAccount/AccessAccount';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';
import Home from './Pages/Home';
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
import ScheduleInterview from './Components/ScheduleInterview/ScheduleInterview';
import GetApplicantForInterview from './Components/GetApplicantForInterview/GetApplicantForInterview';
import GetScheduledInterwiew from './Components/GetScheduledInterwiew/GetScheduledInterwiew';
import ScheduleZoomInterview from './Components/ScheduleZoomInterview/ScheduleZoomInterview';

// Route protection components
const ProtectedRoute = ({ role, redirectPath = '/', children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser || (role && currentUser.role !== role)) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

const AdminRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  if (!currentUser?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AccessAccount />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/showjob" element={<ShowJobs />} />
        {currentUser?.role === "interviewer" &&
          <Route path="/meetingDetail" element={<ScheduleZoomInterview />} />
        }
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Profile routes */}
          <Route path="/profile" element={<Profile />}>
            <Route
              index
              element={
                currentUser?.role === "jobseeker" ? <Navigate to="JobSeeker" replace /> :
                  currentUser?.role === "interviewer" ? <Navigate to="Interviewer" replace /> :
                    <Navigate to="Company" replace />
              }
            />
            <Route path="JobSeeker" element={<JobSeekerInfo />} />
            <Route path="Company" element={<CompanyInfo />} />
            <Route path="Interviewer" element={<InterviewerInfo />} />
            <Route path="Create-Subscription" element={<CreateSubscriptionPlan />} />

            {/* Edit profile route */}
            <Route
              path="edit-profile/:id"
              element={
                currentUser?.role === "company" ? <Com_Edit_Profile /> :
                  currentUser?.role === "interviewer" ? <InterviewerEditProfile /> :
                    currentUser?.role === "jobseeker" ? <EditProfile /> :
                      <Navigate to="/profile" replace />
              }
            />

            {/* Company-specific profile routes */}
            {currentUser?.role === "company" && (
              <>
                <Route path="get-my-job/:id" element={<GetCompanyJob />} />
                <Route path="myjobdetail/:id" element={<ApplicantJob />} />
              </>
            )}

            {/* Admin-specific profile routes */}
            {currentUser?.isAdmin && (
              <>
                <Route path="getallcompanies" element={<GetCompanies />} />
                <Route path="getallusers" element={<GetJobSeekers />} />
                <Route path="getallapplications" element={<GetApplications />} />
                <Route path="getalljobs" element={<GetAllJob />} />
                <Route path="getallinterviewers" element={<GetInterviewer />} />
                <Route path="registerInterviewer" element={<RegisterInterviewer />} />
                <Route path="createSubscription" element={<CreateSubscriptionPlan />} />
                <Route path="subscriptionPlan" element={<SubscriptionPlans />} />
              </>
            )}

            {/* Interviewer-specific profile routes */}
            {currentUser?.role === "interviewer" && (
              <>
                <Route path="myjobdetail/:id" element={<GetApplicantForInterview />} />
                <Route path="scheduleInterview" element={<ScheduleInterview />} />
                <Route path="getScheduleInterview" element={<GetScheduledInterwiew />} />
              </>
            )}

            {/* Jobseeker-specific profile routes */}
            {currentUser?.role === "jobseeker" && (
              <Route path="getappiedjobs" element={<GetAppliedJobs />} />
            )}
          </Route>

          {/* Company specific routes */}
          <Route element={<ProtectedRoute role="company" />}>
            <Route path="/createjob" element={<CreateJob />} />
            <Route path="/get-my-job/:id" element={<CompanyJobs />} />
            <Route path="/myjobdetail/:id" element={<ApplicantJob />} />
            <Route path="/createjobcomp" element={<CreateJobCom />} />
          </Route>

          {/* Admin specific routes */}
          <Route element={<AdminRoute />}>
            <Route path="/registerinterviewer" element={<RegisterInterviewer />} />
            <Route path="/getallcompanies" element={<ListCompanies />} />
            <Route path="/getallusers" element={<ListUsers />} />
            <Route path="/getallapplications" element={<ListApplications />} />
            <Route path="/getalljobs" element={<ListJobs />} />
          </Route>
        </Route>

        {/* Fallback route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;