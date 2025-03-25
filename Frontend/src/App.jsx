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
        <Route path='/createjob' element={<CreateJob />} />
        <Route path='/showjob' element={<ShowJobs />} />
        <Route path='/profile' element={<Profile />} >
        {currentUser?.role === "jobseeker" ? 
          <Route index element={<Navigate to="JobSeeker" />} /> 
          : 
          <Route index element={<Navigate to="Company" />} />
          }
          <Route path='JobSeeker' element={<JobSeekerInfo />} />
          <Route path='Company' element={<CompanyInfo />} />
          <Route path='Create-Subscription' element={<CreateSubscriptionPlan />} />
          <Route path='edit-profile/:id' element={currentUser?.role === "jobseeker" ? <EditProfile /> : <Com_Edit_Profile/>} />
        </Route>
        <Route path="/job/:id" element={<JobDetail />} />
        {currentUser?.role === "company" && (
          <Route path="/get-my-job/:id" element={<CompanyJobs />} />
        )}
        {currentUser?.isAdmin && (
          <Route path="/getallcompanies" element={<ListCompanies />} />
        )}
        {currentUser?.isAdmin && (
          <Route path="/getallusers" element={<ListUsers />} />
        )}
        {currentUser?.isAdmin && (
          <Route path="/getallapplications" element={<ListApplications />} />
        )}
        {currentUser?.isAdmin && (
          <Route path="/getalljobs" element={<ListJobs />} />
        )}
        {currentUser?.role === "company" && (
          <Route path="/myjobdetail/:id" element={<ApplicantJob />} />
        )}
        {currentUser?.role === "jobseeker" && (
          <Route path='/getappiedjobs' element={<AppliedJobs />} />
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
