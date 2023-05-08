export function getSlideIndex(currentIndex, direction, charactersLength, selectedCharacters) {
    const offset = direction === 'next' ? 1 : -1;
    let nextIndex = (currentIndex + offset + charactersLength) % charactersLength;

    while (selectedCharacters.includes(nextIndex)) {
        nextIndex = (nextIndex + offset + charactersLength) % charactersLength;
    }

    return nextIndex;
}

export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    const nextIndex = getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters);
    setCurrentIndex(nextIndex);
}

export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    const prevIndex = getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters);
    setCurrentIndex(prevIndex);
}

export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, selectedCharacters) {
    if (!selectedCharacters || selectedCharacters.length === 3) return;
    if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D') {
        goToNextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A') {
        goToPreviousSlide();
    }
}

export function findCharacterIndex(characters, charID) {
    return characters.findIndex((char) => char.charID === charID);
}