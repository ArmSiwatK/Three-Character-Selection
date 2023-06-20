import React, { useEffect, useState } from "react";
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex, selectedCharacters, name, title }) => {

    /*
    < --------------- States --------------- >
    */

    // Actual displayed characters is displayCount-2; characters at both ends are invisible.
    const [displayCount, setDisplayCount] = useState(9);
    const [activeIndex, setActiveIndex] = useState(null);

    /*
    < --------------- Functions --------------- >
    */

    // Calculate circular index to handle looping through character indices
    const circularIndex = (index, length) => (index + length) % length;

    // Create an array of characters to be displayed based on the current index and displayCount
    const getDisplayedCharacters = () => {
        const displayedCount = Math.min(displayCount, characters.length);
        return Array.from({ length: displayedCount }, (_, i) =>
            characters[circularIndex(currentIndex - Math.floor(displayCount / 2) + i, characters.length)]
        );
    };

    /*
    < --------------- useEffect Hooks --------------- >
    */

    // Active highlight on current index
    useEffect(() => {
        setActiveIndex(currentIndex);
    }, [currentIndex, setCurrentIndex, selectedCharacters]);

    // Gallery item display amount adjustment based on screen size.
    useEffect(() => {
        const updateDisplayCount = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                setDisplayCount(5);
            } else if (window.matchMedia("(max-width: 1200px)").matches) {
                setDisplayCount(7);
            } else {
                setDisplayCount(9);
            }
        };

        updateDisplayCount();
        window.addEventListener("resize", updateDisplayCount);

        return () => {
            window.removeEventListener("resize", updateDisplayCount);
        };
    }, []);

    /*
    < --------------- JSX Structure --------------- >
    */

    return (
        <div className="gallery-side">

            {window.innerWidth <= 1200 ? (
                <h1 className="character-title">{name}</h1>
            ) : (
                <h1 className="character-title">{title}</h1>
            )}

            <div className="gallery-set">

                {getDisplayedCharacters().map((character, index) => {

                    const characterIndex = circularIndex(
                        currentIndex - Math.floor(displayCount / 2) + index,
                        characters.length
                    );

                    const isHidden = index === 0 || index === getDisplayedCharacters().length - 1;
                    const isActive = characterIndex === activeIndex;
                    const isChosen = selectedCharacters.includes(characterIndex);
                    const profileImg = `./profiles/${character.charID}.webp`;

                    return (
                        <div
                            key={character.charID}
                            className={`gallery-wrapper ${isHidden ? "hidden" : ""} ${isActive ? "active" : ""} ${isChosen ? "chosen" : ""}`}
                        >
                            <img src={profileImg} alt={character.name} />
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

export default Gallery;