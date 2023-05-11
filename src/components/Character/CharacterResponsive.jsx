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

        // Check if the panel is a blank panel (no selected character)
        const isBlankPanel = !selectedCharacter;

        return (
            <div key={panel} className={`character-panel ${isActivePanel ? 'active-panel' : ''}`}>
                <h1>{name || props.name}</h1>
                <img className="character-portrait" src={image || props.image} alt={props.name} />
                {isActivePanel && !isBlankPanel && (
                    <button onClick={() => handleCharacterDeselection(panel)}>Deselect</button>
                )}
            </div>
        );
    };

    // Handle character deselection for the given panel
    const handleCharacterDeselection = (panel) => {
        const panelIndex = parseInt(panel.charAt(panel.length - 1));
        const previousPanel = `panel${panelIndex - 1}`;

        setSelectedCharacters((prevSelectedCharacters) => ({
            ...prevSelectedCharacters,
            [panel]: null,
        }));

        setActivePanel(previousPanel);
    };

    // Handle character selection for the given panel
    const handleCharacterSelection = (panel, character) => {
        setSelectedCharacters((prevSelectedCharacters) => ({
            ...prevSelectedCharacters,
            [panel]: character,
        }));

        setActivePanel(`panel${parseInt(panel.charAt(panel.length - 1)) + 1}`);
    };

    // Render the character component with the active panel
    return (
        <div className="characters-container">
            {renderCharacterPanel(activePanel)}
        </div>
    );
}

export default CharacterResponsive;