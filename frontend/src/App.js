import './App.css';
import Navbar from './components/Common/Navbar/Navbar.js';
import About from './pages/Client/About/about.js';
import Home from "./pages/Client/Home/home.js";
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom'



function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
