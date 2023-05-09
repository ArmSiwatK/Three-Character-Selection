import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {
    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel3: { name: ' ', image: './portraits/blank.png' },
        panel2: { name: ' ', image: './portraits/blank.png' },
    });



    const renderCharacterPanel = (panel) => {
        const { name, image } = latestProps[panel];
        const isBlankPanel = name === ' ' && image === './portraits/blank.png';

        const handleClick = () => {
            if (!props.lockedPanels[panel]) {
                setLatestProps((prevLatestProps) => {
                    const updatedPanel = { ...prevLatestProps[panel] };
                    updatedPanel.image = updatedPanel.image === props.image ? props.reactionImg : props.image;
                    return {
                        ...prevLatestProps,
                        [panel]: updatedPanel,
                    };
                });
            }
        };        

        return (
            <div key={panel} className={`character-panel ${isBlankPanel ? 'blank-panel' : ''}`}>
                <h1>{name || props.name}</h1>
                <img className="character-portrait" src={image || props.image} alt={props.name} onClick={handleClick} />
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
                updatedPanel = { name: props.name, image: props.image };
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

export default Character;