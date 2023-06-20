import React, { useState, useEffect } from 'react';
import { handleKeyDown, findCharacterIndex, goToNextSlide, goToPreviousSlide, scrollToRandomCharacter, goToNextIndex, goToPreviousIndex } from './CarouselUtils';
import Gallery from '../Gallery/Gallery';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import Character from '../Character/Character';
import CharacterResponsive from '../Character/CharacterResponsive';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {

    /*
    < --------------- States and Variables --------------- >
    */

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedCharacters, setSelectedCharacters] = useState([]);
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true,
    });

    const character = characters[currentIndex];
    const selectSound = new Audio('./audio/select.wav');
    const deselectSound = new Audio('./audio/deselect.wav');

    /*
    < --------------- Functions --------------- >
    */

    // Update the locked panels based on the selected characters
    const updateLockedPanels = (selectedChars) => {
        setLockedPanels({
            panel1: selectedChars.length >= 1,
            panel2: selectedChars.length >= 2,
            panel3: selectedChars.length === 3,
        });
    };

    // Update the selected characters and locked panels
    const updateSelectedCharacters = (updatedSelectedCharacters) => {
        setSelectedCharacters(updatedSelectedCharacters);
        updateLockedPanels(updatedSelectedCharacters);
    };

    // Handle character selection through index; go to next slide if not on second selected character
    const handleCharSelect = (charID) => {
        if (selectedCharacters.length < 3) {
            const newIndex = findCharacterIndex(characters, charID);
            setCurrentIndex(newIndex);
            updateSelectedCharacters([...selectedCharacters, newIndex]);

            if (selectedCharacters.length !== 2) {
                goToNextSlide(newIndex, characters.length, setCurrentIndex, selectedCharacters);
            }
            selectSound.play();
        }
    };

    // Handle character deselection through removal from array
    const handleCharDeselect = () => {
        if (selectedCharacters.length > 0) {
            const updatedSelectedCharacters = selectedCharacters.slice(0, -1);
            updateSelectedCharacters(updatedSelectedCharacters);
            deselectSound.play();
        }
    };

    /*
    < --------------- useEffect Hooks --------------- >
    */

    // Handle keydown event for navigation and character selection/deselection
    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToNextIndex(currentIndex, characters.length, setCurrentIndex, selectedCharacters, characters),
                () => goToPreviousIndex(currentIndex, characters.length, setCurrentIndex, selectedCharacters, characters),
                () => scrollToRandomCharacter(lockedPanels, selectedCharacters, setCurrentIndex, characters),
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

    // Preload images when the component mounts
    useEffect(() => {
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

    /*
    < --------------- JSX Structure --------------- >
    */

    return (
        <div className="carousel-container">
            <Gallery
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                selectedCharacters={selectedCharacters}
                name={character.name}
                title={character.title}
            />
            <NavigationButtons
                goToPreviousSlide={() => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                handleCharSelect={() => handleCharSelect(character.charID)}
                handleCharDeselect={handleCharDeselect}
                selectedCharacters={selectedCharacters}
                goToNextSlide={() => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                scrollToRandomCharacter={() => scrollToRandomCharacter(lockedPanels, selectedCharacters, setCurrentIndex, characters)}
            />
            {window.innerWidth <= 768 ? (
                <CharacterResponsive
                    name={character.name}
                    image={`./portraits/${character.charID}.webp`}
                    lockedPanels={lockedPanels}
                />
            ) : (
                <Character
                    name={character.name}
                    image={`./portraits/${character.charID}.webp`}
                    lockedPanels={lockedPanels}
                />
            )}
        </div>
    );
}

export default Carousel;