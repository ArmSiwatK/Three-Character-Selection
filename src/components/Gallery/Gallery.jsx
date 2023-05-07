import React, { useState, useEffect } from "react";
import characters from "../../assets/characters.json";
import YouTubeAudio from "../YouTubeAudio/YouTubeAudio";
import "./Gallery.css";

const Gallery = ({ onCharSelect, selectedCharID, videoID }) => {
    const [showAll, setShowAll] = useState(false);
    const initialDisplayCount = 7;

    const handleImageClick = (charID) => {
        onCharSelect(charID);
    };

    const handleShowMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
    };

    const circularIndex = (index, length) => (index + length) % length;

    const getDisplayedCharacters = () => {
        if (showAll) return characters;
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
                handleShowMore();
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                handleShowLess();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);



    return (
        <div className="gallery-container">
            <div className={`youtube-audio-container ${showAll ? "visible" : "hidden"}`}>
                <YouTubeAudio videoID={videoID} />
            </div>

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

            <div className="button-side">
                <button
                    className="show-button"
                    onClick={showAll ? handleShowLess : handleShowMore}
                >
                    {showAll ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};

export default Gallery;