import './App.css';
import Navbar from './components/Navbar.js';
import Home from "./pages/Client/Home.js";
import { BrowserRouter, Routes, Route, Router, Link } from 'react-router-dom'

const About = () => {
  return <h1>About Page</h1>;
};



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
