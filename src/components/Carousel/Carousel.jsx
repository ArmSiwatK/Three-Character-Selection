import React, { useState, useEffect } from 'react';
import { handleKeyDown, findCharacterIndex, goToNextSlide, goToPreviousSlide } from './CarouselUtils';
import CarouselTop from '../CarouselTop/CarouselTop';
import Character from '../Character/Character';
import CharacterReaction from '../Character/CharacterReaction';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const character = characters[currentIndex];
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [isAnimationActive, setIsAnimationActive] = useState(false);
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true,
    });



    const updateLockedPanels = (selectedChars) => {
        setLockedPanels({
            panel1: selectedChars.length >= 1,
            panel2: selectedChars.length >= 2,
            panel3: selectedChars.length === 3,
        });
    };

    const updateSelectedCharacters = (updatedSelectedCharacters) => {
        setSelectedCharacters(updatedSelectedCharacters);
        updateLockedPanels(updatedSelectedCharacters);
        setIsAnimationActive(true);
        setTimeout(() => {
            setIsAnimationActive(false);
        }, 1000);
    };

    const handleCharSelect = (charID) => {
        if (selectedCharacters.length < 3) {
            const newIndex = findCharacterIndex(characters, charID);
            setCurrentIndex(newIndex);
            updateSelectedCharacters([...selectedCharacters, newIndex]);

            if (selectedCharacters.length !== 2) {
                goToNextSlide(newIndex, characters.length, setCurrentIndex, selectedCharacters);
            }
        }
    };

    const handleCharDeselect = () => {
        if (selectedCharacters.length > 0) {
            const updatedSelectedCharacters = selectedCharacters.slice(0, -1);
            updateSelectedCharacters(updatedSelectedCharacters);
        }
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
            <CarouselTop
                character={character}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                selectedCharacters={selectedCharacters}
                handleCharSelect={handleCharSelect}
                handleCharDeselect={handleCharDeselect}
                goToPreviousSlide={() =>
                    goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)
                }
                goToNextSlide={() => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
            />
            <div
                className={`character-wrapper ${isAnimationActive ? 'animate-opacity' : ''}`}
                style={{ opacity: isAnimationActive ? 0 : 1 }}
            >
                <Character
                    name={character.name}
                    image={character.image}
                    lockedPanels={lockedPanels}
                />
            </div>
            <div
                className={`character-reaction-wrapper ${isAnimationActive ? 'animate-opacity' : ''}`}
                style={{ opacity: isAnimationActive ? 1 : 0 }}
            >
                <CharacterReaction
                    name={character.name}
                    reactionImg={character.reactionImg}
                    lockedPanels={lockedPanels}
                />
            </div>
        </div>
    );
}

export default Carousel;