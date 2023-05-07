import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {
    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel2: { name: ' ', image: './portraits/blank.png' },
        panel3: { name: ' ', image: './portraits/blank.png' }
    });

    useEffect(() => {
        const updateLatestProps = (panel) => {
            if (!props.lockedPanels[panel]) {
                setLatestProps((prevLatestProps) => {
                    if (panel === 'panel3' && !props.lockedPanels['panel2']) {
                        return {
                            ...prevLatestProps,
                            panel3: { name: ' ', image: './portraits/blank.png' }
                        };
                    } else if (panel === 'panel2' && !props.lockedPanels['panel1']) {
                        return {
                            ...prevLatestProps,
                            panel2: { name: ' ', image: './portraits/blank.png' }
                        };
                    }
                    return {
                        ...prevLatestProps,
                        [panel]: { name: props.name, image: props.image }
                    };
                });
            }
        };

        updateLatestProps('panel1');
        updateLatestProps('panel2');
        updateLatestProps('panel3');
    }, [props]);

    const renderCharacterPanel = (panel) => {
        return (
            <div key={panel} className="character-panel">
                <h1>{latestProps[panel].name || props.name}</h1>
                <img
                    className="character-portrait"
                    src={latestProps[panel].image || props.image}
                    alt={props.name}
                />
            </div>
        );
    };

    return (
        <div className="characters-container">
            {['panel1', 'panel2', 'panel3'].map((panel) => renderCharacterPanel(panel))}
        </div>
    );
}

export default Character;