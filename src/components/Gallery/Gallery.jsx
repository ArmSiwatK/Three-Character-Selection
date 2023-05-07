import React, { useState, useEffect } from "react";
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ onCharSelect, selectedCharID }) => {
    const initialDisplayCount = 7;

    const circularIndex = (index, length) => (index + length) % length;

    const getDisplayedCharacters = () => {
        if (!selectedCharID) return characters.slice(0, initialDisplayCount);

        const selectedIndex = characters.findIndex(
            (character) => character.charID === selectedCharID
        );
        const displayedCount = Math.min(initialDisplayCount, characters.length);

        return Array.from({ length: displayedCount }, (_, i) =>
            characters[circularIndex(selectedIndex - 3 + i, characters.length)]
        );
    };

    const displayedCharacters = getDisplayedCharacters();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowDown") {
                event.preventDefault();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleImageClick = (charID) => {
        onCharSelect(charID);
    };

    return (
        <div className="gallery-side">
            {displayedCharacters.map((character) => (
                <div
                    key={character.charID}
                    className={`gallery-wrapper ${character.charID === selectedCharID ? "active" : ""
                        }`}
                    onClick={() => handleImageClick(character.charID)}
                >
                    <img src={character.profileImg} alt={character.name} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;