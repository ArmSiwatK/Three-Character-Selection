import React, { useState, useEffect } from 'react';
import { handleKeyDown, findCharacterIndex, goToNextSlide, goToPreviousSlide } from './CarouselUtils';
import Gallery from '../Gallery/Gallery';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import Character from '../Character/Character';
import CharacterResponsive from '../Character/CharacterResponsive';
import characters from '../../assets/characters.json';
import './Carousel.css';

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0); // State variable to track the current index of the carousel
    const [selectedCharacters, setSelectedCharacters] = useState([]); // State variable to store the selected characters
    const [lockedPanels, setLockedPanels] = useState({
        panel1: false,
        panel2: true,
        panel3: true,
    }); // State variable to manage locked panels

    const character = characters[currentIndex]; // Get the character object based on the current index
    const selectSound = new Audio('./audio/select.wav'); // Create an audio element for the select sound
    const deselectSound = new Audio('./audio/deselect.wav'); // Create an audio element for the deselect sound
    const scrollSound = new Audio('./audio/scroll.wav');



    // Update the locked panels based on the selected characters
    const updateLockedPanels = (selectedChars) => {
        setLockedPanels({
            panel1: selectedChars.length >= 1,
            panel2: selectedChars.length >= 2,
            panel3: selectedChars.length === 3,
        });
    };

    // Update the selected characters and perform animation
    const updateSelectedCharacters = (updatedSelectedCharacters) => {
        setSelectedCharacters(updatedSelectedCharacters); // Update the selected characters
        updateLockedPanels(updatedSelectedCharacters); // Update the locked panels based on the updated selected characters
    };

    // Handle character selection
    const handleCharSelect = (charID) => {
        if (selectedCharacters.length < 3) {
            const newIndex = findCharacterIndex(characters, charID); // Find the index of the selected character
            setCurrentIndex(newIndex); // Set the current index to the selected character index
            updateSelectedCharacters([...selectedCharacters, newIndex]); // Update the selected characters array with the new index

            if (selectedCharacters.length !== 2) {
                goToNextSlide(newIndex, characters.length, setCurrentIndex, selectedCharacters); // Go to the next slide if not on the second selected character
            }
            selectSound.play(); // Play the select sound
        }
    };

    // Handle character deselection
    const handleCharDeselect = () => {
        if (selectedCharacters.length > 0) {
            const updatedSelectedCharacters = selectedCharacters.slice(0, -1); // Remove the last character from the selected characters array
            updateSelectedCharacters(updatedSelectedCharacters); // Update the selected characters array
            deselectSound.play(); // Play the deselect sound
        }
    };

    const scrollToRandomCharacter = () => {
        if (!lockedPanels.panel3 || selectedCharacters.length === 0) {
            let randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index within the characters array

            // Check if the randomly selected index is already selected in Panel 1 or Panel 2
            const panel1Index = selectedCharacters[0];
            const panel2Index = selectedCharacters[1];
            if (panel1Index === randomIndex || panel2Index === randomIndex) {
                randomIndex = getSlideIndex(randomIndex, 'next', characters.length, selectedCharacters); // Find the next available index
            }

            setCurrentIndex(randomIndex); // Set the current index to the random index
            scrollSound.play();
            document.activeElement.blur();
        }
    };



    // Handle keydown event for navigation and character selection/deselection
    useEffect(() => {
        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                selectedCharacters
            );

            if (event.key === 'Enter' && selectedCharacters.length < 3) {
                handleCharSelect(character.charID); // Handle character selection when Enter key is pressed
            } else if (event.key === 'Backspace' && selectedCharacters.length > 0) {
                handleCharDeselect(); // Handle character deselection when Backspace key is pressed
            } else if (['r', 'R'].includes(event.key)) {
                scrollToRandomCharacter(); // Handle random selection when R key is pressed
            }
        };

        document.addEventListener('keydown', handleKeyDownEvent); // Add event listener for keydown

        return () => {
            document.removeEventListener('keydown', handleKeyDownEvent); // Remove event listener when component unmounts
        };
    }, [currentIndex, selectedCharacters]);



    return (
        <div className="carousel-container">
            <Gallery
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                selectedCharacters={selectedCharacters}
                name={character.name}
                title={character.title}
                lockedPanels={lockedPanels}
            />
            <NavigationButtons
                goToPreviousSlide={() => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                handleCharSelect={() => handleCharSelect(character.charID)}
                handleCharDeselect={handleCharDeselect}
                selectedCharacters={selectedCharacters}
                goToNextSlide={() => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters)}
                scrollToRandomCharacter={scrollToRandomCharacter}
            />
            {window.innerWidth <= 768 ? (
                <CharacterResponsive
                    name={character.name}
                    image={`./portraits/${character.charID}.png`}
                    lockedPanels={lockedPanels}
                />
            ) : (
                <Character
                    name={character.name}
                    image={`./portraits/${character.charID}.png`}
                    lockedPanels={lockedPanels}
                />
            )}
        </div>
    );
}

export default Carousel;