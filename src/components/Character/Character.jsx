import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {

    // State to keep track of the latest props received for each panel
    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel3: { name: ' ', image: './portraits/blank.png' },
        panel2: { name: ' ', image: './portraits/blank.png' },
    });



    // Render the character panel with the given panel name
    const renderCharacterPanel = (panel) => {
        const { name, image } = latestProps[panel];

        // Check if the panel is a blank panel (no name and a specific image)
        const isBlankPanel = name === ' ' && image === './portraits/blank.png';

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
            // Determine the updated panel object based on the panel and its relationship with other panels
            const updatedPanel =
                panel === 'panel2' && !props.lockedPanels['panel1']
                    ? { name: ' ', image: './portraits/blank.png' }
                    : panel === 'panel3' && !props.lockedPanels['panel2']
                        ? { name: ' ', image: './portraits/blank.png' }
                        : { name: props.name, image: props.image };

            // Update the latestProps state by merging the previous state with the updated panel object
            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                [panel]: updatedPanel,
            }));
        }
    };



    // useEffect to update the latestProps when props change
    useEffect(() => {
        // Iterate over the panel names and invoke the updateLatestProps function for each panel
        ['panel1', 'panel3', 'panel2'].forEach(updateLatestProps);
    }, [props]);



    // Render the character component with three character panels
    return <div className="characters-container">{['panel1', 'panel3', 'panel2'].map(renderCharacterPanel)}</div>;
}

export default Character;