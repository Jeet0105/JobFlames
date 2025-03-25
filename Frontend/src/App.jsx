import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccessAccount from "./Components/AccessAccount/AccessAccount";
import Header from "./Components/header/header";
import Footer from "./Components/footer/footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import CreateJob from "./Pages/CreateJob";
import ShowJobs from "./Pages/ShowJob";
import Profile from "./Pages/Profile";
import JobSeekerInfo from "./Components/JobSeekerInfo/JobSeekerInfo";
import JobDetail from "./Pages/JobDetail";
import EditProfile from "./Components/Edit-Profile/EditProfile";
import CompanyInfo from "./Components/CompanyInfo/CompanyInfo";
import RegisterInterviewer from "./Pages/RegisterInterviewer";
import CompanyJobs from "./Pages/CompanyJobs";
import ApplicantJob from "./Components/ApplicantJob/ApplicantJob";
import AppliedJobs from "./Pages/AppliedJobs";
import ListCompanies from "./Pages/ListCompanies";
import ListUsers from "./Pages/ListUsers";
import ListApplications from "./Pages/ListApplications";
import ListJobs from "./Pages/ListJobs";

function ProtectedRoute({ children, role }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<AccessAccount />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/job/:id" element={<JobDetail />} />

        {/* Protected Routes */}
        <Route path="/showjob" element={<ProtectedRoute role="jobseeker"><ShowJobs /></ProtectedRoute>} />
        <Route path="/createjob" element={<ProtectedRoute role="company"><CreateJob /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/profile" element={<Profile />}>
          <Route path="JobSeeker" element={<ProtectedRoute role="jobseeker"><JobSeekerInfo /></ProtectedRoute>} />
          <Route path="Company" element={<ProtectedRoute role="company"><CompanyInfo /></ProtectedRoute>} />
          <Route path="edit-profile/:id" element={<EditProfile />} />
        </Route>

        {/* Admin-Only Routes */}
        {currentUser?.isAdmin && (
          <>
            <Route path="/registerinterviewer" element={<RegisterInterviewer />} />
            <Route path="/getallcompanies" element={<ListCompanies />} />
            <Route path="/getallusers" element={<ListUsers />} />
            <Route path="/getallapplications" element={<ListApplications />} />
            <Route path="/getalljobs" element={<ListJobs />} />
          </>
        )}

        {/* Company-Only Routes */}
        {currentUser?.role === "company" && (
          <>
            <Route path="/get-my-job/:id" element={<CompanyJobs />} />
            <Route path="/myjobdetail/:id" element={<ApplicantJob />} />
          </>
        )}

        {/* Job Seeker-Only Routes */}
        {currentUser?.role === "jobseeker" && (
          <Route path="/getappliedjobs" element={<AppliedJobs />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
