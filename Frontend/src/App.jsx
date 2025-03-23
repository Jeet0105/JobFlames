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
import { useSelector } from 'react-redux';

function App() {

  const currentUser = useSelector((state)=>state.user.currentUser);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<AccessAccount />} />
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/createjob' element={<CreateJob />}/>
        <Route path='/showjob' element={<ShowJobs />}/>
        <Route path='/profile' element={<Profile />} >
        {currentUser?.role === "jobseeker" ? 
          <Route index element={<Navigate to="JobSeeker" />} /> 
          : 
          <Route index element={<Navigate to="Company" />} />
          }
          <Route path='JobSeeker' element={<JobSeekerInfo />} />
          <Route path='Company' element={<CompanyInfo />} />
          <Route path='edit-profile/:id' element={<EditProfile />} />
        </Route>
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
