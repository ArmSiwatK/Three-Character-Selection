import React, { useState } from 'react';
import './Character.css';

function CharacterResponsive(props) {
    const [activePanel, setActivePanel] = useState('panel1');

    // State to keep track of the latest character selected for each panel
    const [selectedCharacters, setSelectedCharacters] = useState({
        panel1: null,
        panel2: null,
        panel3: null,
    });



    // Render the character panel with the given panel name
    const renderCharacterPanel = (panel) => {
        const isActivePanel = panel === activePanel;
        const selectedCharacter = selectedCharacters[panel];
        const { name, image } = selectedCharacter || {};

        return (
            <div key={panel} className={`character-panel ${isActivePanel ? 'active-panel' : ''}`}>
                <h1>{name || props.name}</h1>
                <img className="character-portrait" src={image || props.image} alt={props.name} />
            </div>
        );
    };



    // Render the character component with the active panel
    return (
        <div className="characters-container">
            {renderCharacterPanel(activePanel)}
        </div>
    );
}

export default CharacterResponsive;