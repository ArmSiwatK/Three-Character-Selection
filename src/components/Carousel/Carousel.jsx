import React, { useState, useEffect } from 'react';
import Character from '../Character/Character';
import Gallery from '../Gallery/Gallery';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const character = characters[currentIndex];



    const getSlideIndex = (direction) => {
        const offset = direction === 'next' ? 1 : -1;
        return (currentIndex + offset + characters.length) % characters.length;
    };

    const goToNextSlide = () => {
        const nextIndex = getSlideIndex('next');
        setCurrentIndex(nextIndex);
    };

    const goToPreviousSlide = () => {
        const prevIndex = getSlideIndex('prev');
        setCurrentIndex(prevIndex);
    };

    const handleCharSelect = (charID) => {
        const newIndex = characters.findIndex((char) => char.charID === charID);
        setCurrentIndex(newIndex);
    };



    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                goToNextSlide();
            } else if (event.key === 'ArrowLeft') {
                goToPreviousSlide();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex]);



    return (
        <div className="carousel-container">
            <h1 className="character-title">{character.title}</h1>
            <Gallery onCharSelect={handleCharSelect} selectedCharID={character.charID} />
            <Character
                name={character.name}
                image={character.image}
            />
        </div>
    );
}

export default Carousel;