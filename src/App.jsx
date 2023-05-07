import React from 'react';
import Background from './components/Background/Background';
import Carousel from './components/Carousel/Carousel';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <Background />
      <Carousel />
    </div>
  );
}

export default App;