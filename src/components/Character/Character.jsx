import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {

    /*
    < --------------- State --------------- >
    */

    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel2: { name: ' ', image: './portraits/blank.webp' },
        panel3: { name: ' ', image: './portraits/blank.webp' },
    });

    /*
    < --------------- Functions --------------- >
    */

    // Render the character panel with the given panel name
    const renderCharacterPanel = (panel) => {
        const { name, image } = latestProps[panel];
        const isBlankPanel = name === ' ' && image === './portraits/blank.webp';

        return (
            <div key={panel} className={`character-panel ${isBlankPanel ? 'blank-panel' : ''}`}>
                <h1>{name || props.name}</h1>
                <img className="character-portrait" src={image || props.image} alt={props.name} />
            </div>
        );
    };

    // Update the latestProps state based on the panel and lockedPanels prop
    const updateLatestProps = (panel) => {
        // Check if the panel is not locked
        if (!props.lockedPanels[panel]) {

            const updatedPanel =
                panel === 'panel2' && !props.lockedPanels['panel1']
                    ? { name: ' ', image: './portraits/blank.webp' }
                    : panel === 'panel3' && !props.lockedPanels['panel2']
                        ? { name: ' ', image: './portraits/blank.webp' }
                        : { name: props.name, image: props.image };

            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                [panel]: updatedPanel,
            }));
        }
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

    // Iterate over the panel names and invoke updateLatestProps for each panel
    useEffect(() => {
        ['panel2', 'panel1', 'panel3'].forEach(updateLatestProps);
    }, [props]);

    /*
    < --------------- JSX Structure --------------- >
    */

    // Render the character component with three character panels
    return <div className="characters-container">{['panel2', 'panel1', 'panel3'].map(renderCharacterPanel)}</div>;
}

export default Character;