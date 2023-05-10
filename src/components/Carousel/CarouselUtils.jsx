export function getSlideIndex(currentIndex, direction, charactersLength, selectedCharacters) {
    const offset = direction === 'next' ? 1 : -1;
    let nextIndex = (currentIndex + offset + charactersLength) % charactersLength;

    while (selectedCharacters.includes(nextIndex)) {
        nextIndex = (nextIndex + offset + charactersLength) % charactersLength;
    }

    return nextIndex;
}



function playSlideTransitionSound() {
    const audio = new Audio('./audio/scroll.wav');
    audio.play();
}




export function goToNextSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'next', charactersLength, selectedCharacters));
    playSlideTransitionSound();
}



export function goToPreviousSlide(currentIndex, charactersLength, setCurrentIndex, selectedCharacters) {
    setCurrentIndex(getSlideIndex(currentIndex, 'prev', charactersLength, selectedCharacters));
    playSlideTransitionSound();
}



export function handleKeyDown(event, goToNextSlide, goToPreviousSlide, selectedCharacters) {
    if (!selectedCharacters || selectedCharacters.length === 3) return;
    if (['ArrowRight', 'd', 'D'].includes(event.key)) {
        goToNextSlide(event, selectedCharacters);
    } else if (['ArrowLeft', 'a', 'A'].includes(event.key)) {
        goToPreviousSlide(event, selectedCharacters);
    }
}



export function findCharacterIndex(characters, charID) {
    return characters.findIndex(char => char.charID === charID);
}