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
    const [selectedCharacterImage, setSelectedCharacterImage] = useState(character.image);
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true,
    });

    const updateSelectedCharacters = (updatedSelectedCharacters) => {
        setSelectedCharacters(updatedSelectedCharacters);
        updateLockedPanels(updatedSelectedCharacters);
    };

    const handleCharSelect = (charID) => {
        if (selectedCharacters.length < 3) {
            const newIndex = findCharacterIndex(characters, charID);
            setCurrentIndex(newIndex);
            updateSelectedCharacters([...selectedCharacters, newIndex]);

            if (selectedCharacters.length !== 2) {
                goToNextSlide(newIndex, characters.length, setCurrentIndex, selectedCharacters);
            }

            const selectedCharacter = characters[newIndex];
            setSelectedCharacterImage(selectedCharacter.reactionImg);

            setTimeout(() => {
                setSelectedCharacterImage(selectedCharacter.image);
            }, 1000);
        }
    };

    const handleCharDeselect = () => {
        if (selectedCharacters.length > 0) {
            const updatedSelectedCharacters = selectedCharacters.slice(0, -1);
            updateSelectedCharacters(updatedSelectedCharacters);
        }
    };

    const updateLockedPanels = (selectedChars) => {
        setLockedPanels({
            panel1: selectedChars.length >= 1,
            panel2: selectedChars.length >= 2,
            panel3: selectedChars.length === 3,
        });
    };

    const toggleLock = (panel) => {
        setLockedPanels((prevLockedPanels) => ({
            ...prevLockedPanels,
            [panel]: !prevLockedPanels[panel],
        }));
    };

    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                selectedCharacters
            );

            if (event.key === 'Enter' && selectedCharacters.length < 3) {
                handleCharSelect(character.charID);
            } else if (event.key === 'Backspace' && selectedCharacters.length > 0) {
                handleCharDeselect();
            }
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
                <div className="navigation-buttons">
                    <button
                        onClick={() => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                        className="left-button"
                    >◄</button>
                    <button
                        onClick={() => handleCharSelect(character.charID)}
                        disabled={selectedCharacters.length >= 3}
                    >
                        Select
                    </button>
                    <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                        Deselect
                    </button>
                    <button
                        onClick={() => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                        className="right-button"
                    >►</button>
                </div>
            </div>
            <Character
                name={character.name}
                image={character.image}
                selectedCharacterImage={selectedCharacterImage}
                setSelectedCharacterImage={setSelectedCharacterImage}
                lockedPanels={lockedPanels}
                toggleLock={toggleLock}
                selectedCharacters={selectedCharacters}
                currentIndex={currentIndex}
            />
        </div>
    );
}

export default Carousel;