import React from 'react';
import Gallery from '../Gallery/Gallery';
import NavigationButtons from './NavigationButtons';

function TopSide({
    character,
    currentIndex,
    setCurrentIndex,
    selectedCharacters,
    handleCharSelect,
    handleCharDeselect,
    goToPreviousSlide,
    goToNextSlide,
}) {
    return (
        <div className="top-side">
            <h1 className="character-title">{character.title}</h1>
            <Gallery
                onCharSelect={handleCharSelect}
                selectedCharID={character.charID}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                selectedCharacters={selectedCharacters}
            />
            <NavigationButtons
                goToPreviousSlide={goToPreviousSlide}
                handleCharSelect={() => handleCharSelect(character.charID)}
                handleCharDeselect={handleCharDeselect}
                selectedCharacters={selectedCharacters}
                goToNextSlide={goToNextSlide}
            />
        </div>
    );
}

export default TopSide;