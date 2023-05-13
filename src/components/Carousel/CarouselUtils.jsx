// Get the index of the next slide based on the current index, direction, characters length, and selected characters
export function getSlideIndex(currentIndex, direction, charactersLength, selectedCharacters) {
    const offset = direction === 'next' ? 1 : -1; // Determine the offset based on the direction
    let nextIndex = (currentIndex + offset + charactersLength) % charactersLength; // Calculate the next index, accounting for wrapping

    // Check if the next index is already selected and keep finding the next available index
    while (selectedCharacters.includes(nextIndex)) {
        nextIndex = (nextIndex + offset + charactersLength) % charactersLength;
    }

    return nextIndex; // Return the next index
}



// Play the slide transition sound
function playSlideTransitionSound() {
    const audio = new Audio('./audio/scroll.wav'); // Create an audio element
    audio.play(); // Play the slide transition sound
}



// Go to the next slide
export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters)); // Set the current index to the next index
    playSlideTransitionSound(); // Play the slide transition sound
}



// Go to the previous slide
export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters)); // Set the current index to the previous index
    playSlideTransitionSound(); // Play the slide transition sound
}



// Go to the next index with indexMark
export function goToNextIndex(currentIndex, charactersLength, setCurrentIndex, selectedCharacters, characters) {
    let nextIndex = getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters); // Get the next index

    // Find the next index with indexMark
    while (!characters[nextIndex].indexMark) {
        nextIndex = getSlideIndex(nextIndex, 'next', charactersLength, selectedCharacters);
    }

    setCurrentIndex(nextIndex); // Set the current index to the next index with indexMark
    playSlideTransitionSound(); // Play the slide transition sound
}



// Go to the previous index with indexMark
export function goToPreviousIndex(currentIndex, charactersLength, setCurrentIndex, selectedCharacters, characters) {
    let prevIndex = getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters); // Get the previous index

    // Find the previous index with indexMark
    while (!characters[prevIndex].indexMark) {
        prevIndex = getSlideIndex(prevIndex, 'prev', charactersLength, selectedCharacters);
    }

    setCurrentIndex(prevIndex); // Set the current index to the previous index with indexMark
    playSlideTransitionSound(); // Play the slide transition sound
}



// Handle keydown event for navigation
export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, goToNextIndex, goToPreviousIndex, scrollToRandomCharacter, selectedCharacters) {
    if (!selectedCharacters || selectedCharacters.length === 3) return; // Return if there are no selected characters or already three selected characters

    if (['d', 'D', 'ArrowRight'].includes(event.key)) {
        goToNextSlide(event, selectedCharacters); // Go to the next slide when the 'D' key is pressed
    } else if (['a', 'A', 'ArrowLeft'].includes(event.key)) {
        goToPreviousSlide(event, selectedCharacters); // Go to the previous slide when the 'A' key is pressed
    } else if (['w', 'W', 'ArrowUp'].includes(event.key)) {
        goToNextIndex(event, selectedCharacters); // Go to the next index with indexMark when the 'W' key is pressed
    } else if (['s', 'S', 'ArrowDown'].includes(event.key)) {
        goToPreviousIndex(event, selectedCharacters); // Go to the previous index with indexMark when the 'S' key is pressed
    } else if (['r', 'R'].includes(event.key)) {
        scrollToRandomCharacter(); // Scroll to a random character when the 'R' key is pressed
    }
}



// Find the index of a character in the characters array based on its charID
export function findCharacterIndex(characters, charID) {
    return characters.findIndex(char => char.charID === charID); // Return the index of the character
}



// Scroll to a random character
export function scrollToRandomCharacter(lockedPanels, selectedCharacters, setCurrentIndex, characters) {
    if (!lockedPanels.panel3 || selectedCharacters.length === 0) {
        let randomIndex = Math.floor(Math.random() * characters.length); // Generate a random index within the characters array

        // Check if the randomly selected index is already selected in Panel 1 or Panel 2
        const panel1Index = selectedCharacters[0];
        const panel2Index = selectedCharacters[1];
        if (panel1Index === randomIndex || panel2Index === randomIndex) {
            randomIndex = getSlideIndex(currentIndex, 'next', characters.length, selectedCharacters); // Find the next available index
        }

        setCurrentIndex(randomIndex); // Set the current index to the random index
        playSlideTransitionSound(); // Play the slide transition sound
        document.activeElement.blur();
    }
}
