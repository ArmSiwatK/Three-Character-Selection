import React from 'react';
import "./NavigationButtons.css";

const NavigationButtons = ({ goToPreviousSlide, handleCharSelect, handleCharDeselect, selectedCharacters, goToNextSlide }) => {
    return (
        <div className="navigation-buttons">
            <button onClick={goToPreviousSlide} className="left-button">
                ◄
            </button>
            <button onClick={handleCharSelect} disabled={selectedCharacters.length >= 3}>
                Select
            </button>
            <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                Deselect
            </button>
            <button onClick={goToNextSlide} className="right-button">
                ►
            </button>
        </div>
    );
};

export default NavigationButtons;