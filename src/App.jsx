import './App.css';
import Header from '../components/Header.jsx';
import VolatilitySurface from '../components/VolatilitySurface.jsx';
import Plot from '../components/Surface.jsx';
import Home from '../components/Home.jsx';
import "../components/components.css";
import Prediction from '../components/Prediction.jsx';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vol" element={<VolatilitySurface />} />
          <Route path="/pred" element={<Prediction />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;