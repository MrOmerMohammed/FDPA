import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Components
import Navbar from './components/Navbar';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Detector from './pages/Detector';
import Resources from './pages/Resources';

// Import styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/detector" element={<Detector />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
        <footer className="footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} FDPA - Fake Detection and Prevention Application | 
              Developed by Team at AVNIET
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;