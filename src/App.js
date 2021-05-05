import React, { useState } from 'react';
import './sass/main.scss';
import './poppers.css';
import Header from './components/Header';
import BarChart from './components/BarChart';
import Histogram from './components/Histogram';
import Footer from './components/Footer';
import data from './data/data';

const App = () => {
  const [selectedPointRange, setSelectedPointRange] = useState(null);
  return (
    <div className="app">
      <Header />
      <BarChart data={data} selectedPointRange={selectedPointRange} />
      <Histogram data={data} setSelectedPointRange={setSelectedPointRange} />
      <Footer />
    </div>
  );
};

export default App;
