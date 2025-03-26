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
import AppliedJobs from './Pages/AppliedJobs';
import ListCompanies from './Pages/ListCompanies';
import ListUsers from './Pages/ListUsers';
import ListApplications from './Pages/ListApplications';
import ListJobs from './Pages/ListJobs';

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

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route 
              index 
              element={
                currentUser?.role === "jobseeker" ? (
                  <Navigate to="JobSeeker" replace />
                ) : (
                  <Navigate to="Company" replace />
                )
              } 
            />
            <Route path="JobSeeker" element={<JobSeekerInfo />} />
            <Route path="Company" element={<CompanyInfo />} />
            <Route path="edit-profile/:id" element={<EditProfile />} />
          </Route>

          {/* Jobseeker specific routes */}
          <Route element={<ProtectedRoute role="jobseeker" />}>
            <Route path="/showjob" element={<ShowJobs />} />
            <Route path="/getappiedjobs" element={<AppliedJobs />} />
            <Route path="/job/:id" element={<JobDetail />} />
          </Route>

          {/* Company specific routes */}
          <Route element={<ProtectedRoute role="company" />}>
            <Route path="/createjob" element={<CreateJob />} />
            <Route path="/get-my-job/:id" element={<CompanyJobs />} />
            <Route path="/myjobdetail/:id" element={<ApplicantJob />} />
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;