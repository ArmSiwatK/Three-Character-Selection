import React from 'react';
import Gallery from '../Gallery/Gallery';
import NavigationButtons from '../NavigationButtons/NavigationButtons';
import "./CarouselTop.css";

function CarouselTop({
    character,
    currentIndex,
    setCurrentIndex,
    selectedCharacters,
    handleCharSelect,
    handleCharDeselect,
    goToPreviousSlide,
    goToNextSlide,
}) {
    const isMobile = window.innerWidth <= 768;

    return (
        <div className="carousel-top">
            {isMobile ? (
                <h1 className="character-title">{character.name}</h1>
            ) : (
                <h1 className="character-title">{character.title}</h1>
            )}
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

export default CarouselTop;