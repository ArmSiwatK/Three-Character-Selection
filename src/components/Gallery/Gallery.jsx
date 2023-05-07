import React, { useEffect } from "react";
import { handleKeyDown, goToNextSlide, goToPreviousSlide } from '../Carousel/CarouselUtils';
import characters from "../../assets/characters.json";
import "./Gallery.css";

const Gallery = ({ currentIndex, setCurrentIndex, selectedCharacters }) => {
    const initialDisplayCount = 9;

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
        const handleKeyDownEvent = (event) => {
            handleKeyDown(
                event,
                () => goToNextSlide(currentIndex, characters.length, setCurrentIndex),
                () => goToPreviousSlide(currentIndex, characters.length, setCurrentIndex),
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
            {displayedCharacters.map((character, index) => (
                <div
                    key={character.charID}
                    className={`gallery-wrapper ${index === 0 || index === displayedCharacters.length - 1 ? "hidden" : ""}`}
                    onClick={(event) =>
                        handleImageClick(
                            event,
                            circularIndex(currentIndex - Math.floor(initialDisplayCount / 2) + index, characters.length)
                        )
                    }
                >
                    <img src={character.profileImg} alt={character.name} />
                </div>
            ))}
        </div>
    );
};

export default Gallery;