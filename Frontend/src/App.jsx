import AccessAccount from "./Components/AccessAccount/AccessAccount"
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './Redux/Theme/themeSlice';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/auth" element={<AccessAccount />} />
        </Routes>
      </BrowserRouter>
      <button
          onClick={() => dispatch(toggleTheme())}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Toggle Theme
        </button>
    </>
  )
}

export default App
