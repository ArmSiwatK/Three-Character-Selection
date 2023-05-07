import React, { useEffect } from "react";
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex }) => {
    const initialDisplayCount = 9;

    const circularIndex = (index, length) => (index + length) % length;

    const getDisplayedCharacters = () => {
        const selectedIndex = currentIndex;
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
                setCurrentIndex((prevIndex) => prevIndex + 1);
            } else if (event.key === "ArrowUp") {
                event.preventDefault();
                setCurrentIndex((prevIndex) => prevIndex - 1);
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentIndex, setCurrentIndex]);


    
    const handleImageClick = (event, index) => {
        event.preventDefault();
        setCurrentIndex(index);
    };

    return (
        <div className="gallery-side">
            {displayedCharacters.map((character, index) => (
                <div
                    key={character.charID}
                    className={`gallery-wrapper ${index === 0 || index === displayedCharacters.length - 1 ? "hidden" : ""}`}
                    onClick={(event) => handleImageClick(event, circularIndex(currentIndex - Math.floor(initialDisplayCount / 2) + index, characters.length))}
                >
                    <img src={character.profileImg} alt={character.name} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;