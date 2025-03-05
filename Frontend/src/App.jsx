import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccessAccount from './Components/AccessAccount/AccessAccount';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';
import Home from './Pages/Home'
import About from './Pages/About';
import Contact from './Pages/Contact';
import CreateJob from './Pages/CreateJob';
import ShowJobs from './Pages/ShowJob';
import Profile from './Pages/Profile';

function App() {
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
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
