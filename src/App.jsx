import React, { useEffect } from 'react';
import Carousel from './components/Carousel/Carousel';
import characters from './assets/characters.json';
import './App.css';

function App() {

  useEffect(() => {
    // Preload images when the component mounts
    const preloadImages = () => {
      const imageUrls = characters.map((character) => `./portraits/${character.charID}.webp`);
      const profileImageUrls = characters.map((character) => `./profiles/${character.charID}.webp`);
      const allImageUrls = [...imageUrls, ...profileImageUrls];

      allImageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };

    preloadImages();
  }, []);

  return (
    <div className="main-container">
      <Carousel />
    </div>
  );
}

export default App;