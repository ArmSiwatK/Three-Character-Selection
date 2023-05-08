export function getSlideIndex(currentIndex, direction, charactersLength, selectedCharacters) {
    const offset = direction === 'next' ? 1 : -1;
    let nextIndex = (currentIndex + offset + charactersLength) % charactersLength;

    while (selectedCharacters.includes(nextIndex)) {
        nextIndex = (nextIndex + offset + charactersLength) % charactersLength;
    }

    return nextIndex;
}



export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters));
}



export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters));
}



export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, selectedCharacters) {
    if (!selectedCharacters || selectedCharacters.length === 3) return;
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        goToNextSlide(event, selectedCharacters);
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        goToPreviousSlide(event, selectedCharacters);
    }
}



export function findCharacterIndex(characters, charID) {
    return characters.findIndex((char) => char.charID === charID);
}



export function toggleLock(panel, lockedPanels, setLockedPanels) {
    setLockedPanels((prevLockedPanels) => ({
        ...prevLockedPanels,
        [panel]: !prevLockedPanels[panel],
    }));
}