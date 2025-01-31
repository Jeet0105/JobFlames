import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AccessAccount from './Components/AccessAccount/AccessAccount';
import Header from './Components/header/header';
import Footer from './Components/footer/footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/auth" element={<AccessAccount />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
