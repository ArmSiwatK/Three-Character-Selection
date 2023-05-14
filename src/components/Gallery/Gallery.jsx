import React, { useEffect, useState } from "react";
import { handleKeyDown, goToNextSlide, goToPreviousSlide } from '../Carousel/CarouselUtils';
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex, selectedCharacters, name, title, lockedPanels }) => {

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



    useEffect(() => {
        // Set the active index to the current index
        setActiveIndex(currentIndex);

        const handleKeyDownEvent = (event) => {
            // Handle keydown events for navigation within the gallery
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                selectedCharacters
            );
        };

        // Add the event listener for keydown events
        document.addEventListener("keydown", handleKeyDownEvent);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    }, [currentIndex, setCurrentIndex, selectedCharacters]);

    useEffect(() => {
        const preloadImages = async () => {
            try {
                const imagePromises = displayedCharacters.map((character) => {
                    return new Promise((resolve) => {
                        const image = new Image();
                        image.src = `./profiles/${character.charID}.png`;
                        image.onload = resolve;
                    });
                });

                await Promise.allSettled(imagePromises);
                console.log("Profiles preloaded successfully");
            } catch (error) {
                console.error("Failed to preload images:", error);
            }
        };

        preloadImages();
    }, [displayedCharacters]);

    useEffect(() => {
        const updateDisplayCount = () => {
            if (window.matchMedia("(max-width: 768px)").matches) {
                setDisplayCount(5); // Set the displayCount for smaller screens
            } else {
                setDisplayCount(9); // Set the default displayCount for larger screens
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



    return (
        <div className="gallery-side">
            {window.innerWidth <= 1440 ? (
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
                    // Get the profile image URL for the character
                    const profileImg = `./profiles/${character.charID}.png`;

                    return (
                        <div
                            key={character.charID}
                            className={`gallery-wrapper ${isHidden ? "hidden" : ""} ${isActive ? "active" : ""}`}
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