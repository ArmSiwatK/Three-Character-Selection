import React, { useState, useEffect } from 'react';
import './Character.css';

function CharacterReaction(props) {
    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel3: { name: ' ', image: './portraits/blank.png' },
        panel2: { name: ' ', image: './portraits/blank.png' },
    });



    const renderCharacterPanel = (panel) => {
        const { name, image } = latestProps[panel];
        const isBlankPanel = name === ' ' && image === './portraits/blank.png';

        return (
            <div key={panel} className={`character-panel ${isBlankPanel ? 'blank-panel' : ''}`}>
                <h1>{name || props.name}</h1>
                <img className="character-portrait" src={image || props.reactionImg} alt={props.name} />
            </div>
        );
    };

    const updateLatestProps = (panel) => {
        if (!props.lockedPanels[panel]) {
            let updatedPanel;
            if (panel === 'panel2' && !props.lockedPanels['panel1']) {
                updatedPanel = { name: ' ', image: './portraits/blank.png' };
            } else if (panel === 'panel3' && !props.lockedPanels['panel2']) {
                updatedPanel = { name: ' ', image: './portraits/blank.png' };
            } else {
                updatedPanel = { name: props.name, image: props.reactionImg };
            }
            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                [panel]: updatedPanel,
            }));
        }
    };



    useEffect(() => {
        ['panel1', 'panel3', 'panel2'].forEach(updateLatestProps);
    }, [props]);



    return <div className="characters-container">{['panel1', 'panel3', 'panel2'].map(renderCharacterPanel)}</div>;
}

export default CharacterReaction;