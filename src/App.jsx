import './App.css';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Plot from '../components/Surface.jsx';
import "../components/components.css";
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;