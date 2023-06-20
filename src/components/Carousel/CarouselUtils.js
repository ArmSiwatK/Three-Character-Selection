function playSlideTransitionSound() {
    const audio = new Audio('./audio/scroll.wav');
    audio.play();
}



export function getSlideIndex(currentIndex, direction, charactersLength, selectedCharacters) {

    // Determine the offset based on the direction
    const offset = direction === 'next' ? 1 : -1;

    // Calculate the next index, accounting for wrapping
    let nextIndex = (currentIndex + offset + charactersLength) % charactersLength;

    // Check if the next index is already selected and keep finding the next available index
    while (selectedCharacters.includes(nextIndex)) {
        nextIndex = (nextIndex + offset + charactersLength) % charactersLength;
    }

    return nextIndex;
}



export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {

    // Set the current index to the next index
    setCurrentIndex(getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters));

    playSlideTransitionSound();
    document.activeElement.blur();
}



export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {

    // Set the current index to the previous index
    setCurrentIndex(getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters));

    playSlideTransitionSound();
    document.activeElement.blur();
}



// Find the index of a character in the characters array based on its charID
export function findCharacterIndex(characters, charID) {
    return characters.findIndex(char => char.charID === charID);
}



export function goToNextIndex(currentIndex, charactersLength, setCurrentIndex, selectedCharacters, characters) {

    // Get the next index
    let nextIndex = getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters);

    // Find the next index with indexMark
    while (!characters[nextIndex].indexMark) {
        nextIndex = getSlideIndex(nextIndex, 'next', charactersLength, selectedCharacters);
    }

    setCurrentIndex(nextIndex);
    playSlideTransitionSound();
}



export function goToPreviousIndex(currentIndex, charactersLength, setCurrentIndex, selectedCharacters, characters) {

    // Get the previous index
    let prevIndex = getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters);

    // Find the previous index with indexMark
    while (!characters[prevIndex].indexMark) {
        prevIndex = getSlideIndex(prevIndex, 'prev', charactersLength, selectedCharacters);
    }

    setCurrentIndex(prevIndex);
    playSlideTransitionSound();
}



export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, goToNextIndex, goToPreviousIndex, scrollToRandomCharacter, selectedCharacters) {

    // Return if there are no selected characters, or there are already three selected characters
    if (!selectedCharacters || selectedCharacters.length === 3) return;

    if (['d', 'D', 'ArrowRight'].includes(event.key)) {
        goToNextSlide(event, selectedCharacters);
    } else if (['a', 'A', 'ArrowLeft'].includes(event.key)) {
        goToPreviousSlide(event, selectedCharacters);
    } else if (['w', 'W', 'ArrowUp'].includes(event.key)) {
        goToNextIndex(event, selectedCharacters);
    } else if (['s', 'S', 'ArrowDown'].includes(event.key)) {
        goToPreviousIndex(event, selectedCharacters);
    } else if (['r', 'R'].includes(event.key)) {
        scrollToRandomCharacter();
    }
}



export function scrollToRandomCharacter(lockedPanels, selectedCharacters, setCurrentIndex, characters) {
    if (!lockedPanels.panel3 || selectedCharacters.length === 0) {

        // Generate a random index within the characters array
        let randomIndex = Math.floor(Math.random() * characters.length);

        // Check if the randomly selected index is already selected in Panel 1 or Panel 2, then find the next available index
        const panel1Index = selectedCharacters[0];
        const panel2Index = selectedCharacters[1];

        if (panel1Index === randomIndex || panel2Index === randomIndex) {
            randomIndex = getSlideIndex(currentIndex, 'next', characters.length, selectedCharacters);
        }

        setCurrentIndex(randomIndex);
        playSlideTransitionSound();
        document.activeElement.blur();
    }
}