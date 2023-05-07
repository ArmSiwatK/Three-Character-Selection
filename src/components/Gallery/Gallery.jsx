import React, { useEffect } from "react";
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ onCharSelect, selectedCharID }) => {
    const initialDisplayCount = 9;

    const circularIndex = (index, length) => (index + length) % length;

    const getDisplayedCharacters = () => {
        if (!selectedCharID) return characters.slice(0, initialDisplayCount);

        const selectedIndex = characters.findIndex(
            (character) => character.charID === selectedCharID
        );
        const displayedCount = Math.min(initialDisplayCount, characters.length);

        return Array.from({ length: displayedCount }, (_, i) =>
            characters[circularIndex(selectedIndex - Math.floor(initialDisplayCount / 2) + i, characters.length)]
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
            {displayedCharacters.map((character, index) => (
                <div
                    key={character.charID}
                    className={`gallery-wrapper ${character.charID === selectedCharID ? "active" : ""} ${index === 0 || index === displayedCharacters.length - 1 ? "hidden" : ""}`}
                    onClick={() => handleImageClick(character.charID)}
                >
                    <img src={character.profileImg} alt={character.name} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;