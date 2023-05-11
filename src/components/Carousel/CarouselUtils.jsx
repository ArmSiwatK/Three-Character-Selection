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



// Handle keydown event for navigation
export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, selectedCharacters) {
    if (!selectedCharacters || selectedCharacters.length === 3) return; // Return if there are no selected characters or already three selected characters

    if (['ArrowRight', 'd', 'D'].includes(event.key)) {
        goToNextSlide(event, selectedCharacters); // Go to the next slide when the right arrow key or 'D' key is pressed
    } else if (['ArrowLeft', 'a', 'A'].includes(event.key)) {
        goToPreviousSlide(event, selectedCharacters); // Go to the previous slide when the left arrow key or 'A' key is pressed
    }
}



// Find the index of a character in the characters array based on its charID
export function findCharacterIndex(characters, charID) {
    return characters.findIndex(char => char.charID === charID); // Return the index of the character
}