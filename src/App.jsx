import './App.css';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Plot from '../components/Plot.jsx';
import "../components/components.css";
import { useEffect, useState } from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Plot />
    </div>
  );
}

export default App;