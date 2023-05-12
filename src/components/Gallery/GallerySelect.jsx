import React from 'react';
import characters from "../../assets/characters.json";
import "./Gallery.css";

const GallerySelect = ({ selectedCharacters, lockedPanels }) => {
    return (
        <div className="gallery-select">
            {selectedCharacters.map((characterIndex, slotIndex) => {
                const character = characters[characterIndex];
                const isLocked = lockedPanels[`panel${slotIndex + 1}`];
                const profileImg = `./profiles/${character.charID}.png`;

                return (
                    <div
                        key={character.charID}
                        className={`gallery-select-item ${isLocked ? "locked" : ""}`}
                    >
                        <img src={profileImg} alt={character.name} />
                    </div>
                );
            })}
        </div>
    );
};

export default GallerySelect;