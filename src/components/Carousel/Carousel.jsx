import React, { useState, useEffect } from 'react';
import Character from '../Character/Character';
import Gallery from '../Gallery/Gallery';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const character = characters[currentIndex];
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true
    });

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

    const toggleLock = (panel) => {
        setLockedPanels((prevLockedPanels) => ({
            ...prevLockedPanels,
            [panel]: !prevLockedPanels[panel]
        }));
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
            <div className="top-side">
                <h1 className="character-title">{character.title}</h1>
                <Gallery onCharSelect={handleCharSelect} selectedCharID={character.charID} />
                <div className="lock-buttons">
                    <button onClick={() => toggleLock('panel1')}>
                        {lockedPanels.panel1 ? 'Unlock' : 'Lock'}
                    </button>
                    <button onClick={() => toggleLock('panel2')}>
                        {lockedPanels.panel2 ? 'Unlock' : 'Lock'}
                    </button>
                    <button onClick={() => toggleLock('panel3')}>
                        {lockedPanels.panel3 ? 'Unlock' : 'Lock'}
                    </button>
                </div>
            </div>
            <Character
                name={character.name}
                image={character.image}
                lockedPanels={lockedPanels}
                toggleLock={toggleLock}
            />
        </div>
    );
}

export default Carousel;