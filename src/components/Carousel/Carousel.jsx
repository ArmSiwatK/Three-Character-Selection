import React, { useState, useEffect } from 'react';
import { handleKeyDown, findCharacterIndex, goToNextSlide, goToPreviousSlide } from './CarouselUtils';
import Character from '../Character/Character';
import Gallery from '../Gallery/Gallery';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const character = characters[currentIndex];
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true
    });



    const updateSelectedCharacters = (updatedSelectedCharacters) => {
        setSelectedCharacters(updatedSelectedCharacters);
        updateLockedPanels(updatedSelectedCharacters);
    };

    const handleCharSelect = (charID) => {
        if (selectedCharacters.length < 3) {
            const newIndex = findCharacterIndex(characters, charID);
            setCurrentIndex(newIndex);
            updateSelectedCharacters([...selectedCharacters, character]);
        }
    };

    const handleCharDeselect = () => {
        if (selectedCharacters.length > 0) {
            const updatedSelectedCharacters = selectedCharacters.slice(0, -1);
            updateSelectedCharacters(updatedSelectedCharacters);
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
    };

    const updateLockedPanels = (selectedChars) => {
        setLockedPanels({
            panel1: selectedChars.length >= 1,
            panel2: selectedChars.length >= 2,
            panel3: selectedChars.length === 3
        });
    };

    const toggleLock = (panel) => {
        setLockedPanels((prevLockedPanels) => ({
            ...prevLockedPanels,
            [panel]: !prevLockedPanels[panel]
        }));
    };



    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex),
                selectedCharacters
            );
        };

        document.addEventListener('keydown', handleKeyDownEvent);

        return () => {
            document.removeEventListener('keydown', handleKeyDownEvent);
        };
    }, [currentIndex, selectedCharacters]);



    return (
        <div className="carousel-container">
            <div className="top-side">
                <h1 className="character-title">{character.title}</h1>
                <Gallery
                    onCharSelect={handleCharSelect}
                    selectedCharID={character.charID}
                    currentIndex={currentIndex}
                    setCurrentIndex={setCurrentIndex}
                    selectedCharacters={selectedCharacters}
                />
                <div className="lock-buttons">
                    <button onClick={() => handleCharSelect(character.charID)} disabled={selectedCharacters.length >= 3}>
                        Select
                    </button>
                    <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                        Deselect
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