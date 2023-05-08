import React, { useEffect, useState } from "react";
import { handleKeyDown, goToNextSlide, goToPreviousSlide } from '../Carousel/CarouselUtils';
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex, selectedCharacters }) => {
    const initialDisplayCount = 9;

    const [activeIndex, setActiveIndex] = useState(null);

    const circularIndex = (index, length) => (index + length) % length;

    const handleImageClick = (event, index) => {
        event.preventDefault();
        if (selectedCharacters.length < 3) {
            setCurrentIndex(index);
        }
    };

    const getDisplayedCharacters = () => {
        const selectedIndex = currentIndex;
        const displayedCount = Math.min(initialDisplayCount, characters.length);

        return Array.from({ length: displayedCount }, (_, i) =>
            characters[circularIndex(selectedIndex - Math.floor(initialDisplayCount / 2) + i, characters.length)]
        );
    };

    const displayedCharacters = getDisplayedCharacters();

    useEffect(() => {
        setActiveIndex(currentIndex);

        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex, selectedCharacters),
                selectedCharacters
            );
        };

        document.addEventListener("keydown", handleKeyDownEvent);

        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
        };
    }, [currentIndex, setCurrentIndex, selectedCharacters]);

    return (
        <div className="gallery-side">
            {displayedCharacters.map((character, index) => {
                const characterIndex = circularIndex(
                    currentIndex - Math.floor(initialDisplayCount / 2) + index,
                    characters.length
                );
                const isHidden = index === 0 || index === displayedCharacters.length - 1;
                const isActive = characterIndex === activeIndex;

                return (
                    <div
                        key={character.charID}
                        className={`gallery-wrapper ${isHidden ? "hidden" : ""} ${isActive ? "active" : ""}`}
                        onClick={(event) => handleImageClick(event, characterIndex)}
                    >
                        <img src={character.profileImg} alt={character.name} />
                    </div>
                );
            })}
        </div>
    );
};

export default Gallery;