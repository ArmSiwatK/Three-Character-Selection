function getSlideIndex(currentIndex, direction, charactersLength) {
    const offset = direction === 'next' ? 1 : -1;
    return (currentIndex + offset + charactersLength) % charactersLength;
}

export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex) {
    const nextIndex = getSlideIndex(currentIndex, 'next', charactersLength);
    setCurrentIndex(nextIndex);
}

export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex) {
    const prevIndex = getSlideIndex(currentIndex, 'prev', charactersLength);
    setCurrentIndex(prevIndex);
}

export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, selectedCharacters) {
    if (selectedCharacters.length === 3) return;
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        goToNextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        goToPreviousSlide();
    }
}

export function findCharacterIndex(characters, charID) {
    return characters.findIndex(char => char.charID === charID);
}