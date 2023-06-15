import React, { useEffect, useState } from "react";
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex, selectedCharacters, name, title }) => {

    // The initial number of characters to display in the gallery
    // Actual displayed characters is displayCount-2; characters at both ends are invisible.
    const [displayCount, setDisplayCount] = useState(9);
    const [activeIndex, setActiveIndex] = useState(null);



    // Calculate the circular index to handle looping through character indices
    const circularIndex = (index, length) => (index + length) % length;

    // Get the characters to be displayed in the gallery
    const getDisplayedCharacters = () => {
        // Calculate the count of characters to be displayed (limited by displayCount)
        const displayedCount = Math.min(displayCount, characters.length);
        // Create an array of characters to be displayed based on the current index and displayCount
        return Array.from({ length: displayedCount }, (_, i) =>
            characters[circularIndex(currentIndex - Math.floor(displayCount / 2) + i, characters.length)]
        );
    };

    // Get the displayed characters for the gallery
    const displayedCharacters = getDisplayedCharacters();



    // Active highlight
    useEffect(() => {
        // Set the active index to the current index
        setActiveIndex(currentIndex);
    }, [currentIndex, setCurrentIndex, selectedCharacters]);

    // Gallery item display amount adjustment based on screen size.
    useEffect(() => {
        const updateDisplayCount = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                setDisplayCount(5); // Set the displayCount for smaller screens
            } else if (window.matchMedia("(max-width: 1200px)").matches) {
                setDisplayCount(7); // Set the default displayCount for larger screens
            } else {
                setDisplayCount(9); // Set the default displayCount for even larger screens
            }
        };

        // Initial update
        updateDisplayCount();

        // Listen for screen size changes
        window.addEventListener("resize", updateDisplayCount);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", updateDisplayCount);
        };
    }, []);

    useEffect(() => {
        const preloadImages = () => {
            const imagePromises = displayedCharacters.map((character) => {
                const profileImg = `./profiles/${character.charID}.png`;
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = profileImg;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });
            Promise.all(imagePromises)
                .then(() => {
                    console.log("All images preloaded successfully");
                })
                .catch((error) => {
                    console.log("Error preloading images:", error);
                });
        };

        preloadImages();
    }, [displayedCharacters]);



    return (
        <div className="gallery-side">
            {window.innerWidth <= 1200 ? (
                <h1 className="character-title">{name}</h1>
            ) : (
                <h1 className="character-title">{title}</h1>
            )}
            <div className="gallery-set">
                {displayedCharacters.map((character, index) => {
                    // Calculate the circular index for each displayed character
                    const characterIndex = circularIndex(
                        currentIndex - Math.floor(displayCount / 2) + index,
                        characters.length
                    );
                    // Determine if the character is hidden (first or last in the displayedCharacters array)
                    const isHidden = index === 0 || index === displayedCharacters.length - 1;
                    // Determine if the character is currently active (based on the active index)
                    const isActive = characterIndex === activeIndex;
                    // Check if the character index is chosen
                    const isChosen = selectedCharacters.includes(characterIndex);
                    // Get the profile image URL for the character
                    const profileImg = `./profiles/${character.charID}.png`;

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