import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {
    const [locked, setLocked] = useState({
        panel1: false,
        panel2: true,
        panel3: true
    });

    const [latestProps, setLatestProps] = useState({
        panel1: { name: '', image: '' },
        panel2: { name: '', image: '' },
        panel3: { name: '', image: '' }
    });

    const toggleLock = (panel) => {
        setLocked((prevLocked) => ({
            ...prevLocked,
            [panel]: !prevLocked[panel]
        }));
    };

    useEffect(() => {
        const updateLatestProps = (panel) => {
            if (!locked[panel]) {
                setLatestProps((prevLatestProps) => ({
                    ...prevLatestProps,
                    [panel]: { name: props.name, image: props.image }
                }));
            }
        };

        updateLatestProps('panel1');
        updateLatestProps('panel2');
        updateLatestProps('panel3');
    }, [props, locked]);

    const renderCharacterPanel = (panel) => {
        return (
            <div className="character-panel">
                <button onClick={() => toggleLock(panel)}>
                    {locked[panel] ? 'Unlock' : 'Lock'}
                </button>
                <h1>{latestProps[panel].name || props.name}</h1>
                <img
                    className="character-portrait"
                    src={latestProps[panel].image || props.image}
                    alt={props.name}
                />
            </div>
        );
    };

    return <div className="characters-container">
        {['panel1', 'panel2', 'panel3'].map((panel) => renderCharacterPanel(panel))}
    </div>;
}

export default Character;