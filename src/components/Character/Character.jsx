import React, { useState, useEffect } from 'react';
import './Character.css';

function Character(props) {
    const [locked, setLocked] = useState({
        panel1: false,
        panel2: false,
        panel3: false
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
        if (!locked.panel1) {
            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                panel1: { name: props.name, image: props.image }
            }));
        }
        if (!locked.panel2) {
            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                panel2: { name: props.name, image: props.image }
            }));
        }
        if (!locked.panel3) {
            setLatestProps((prevLatestProps) => ({
                ...prevLatestProps,
                panel3: { name: props.name, image: props.image }
            }));
        }
    }, [props, locked]);

    return (
        <div className="characters-container">
            <div className="character-panel">
                <h1>{latestProps.panel1.name || props.name}</h1>
                <img className="character-portrait" src={latestProps.panel1.image || props.image} alt={props.name} />
                <button onClick={() => toggleLock('panel1')}>{locked.panel1 ? 'Unlock' : 'Lock'}</button>
            </div>
            <div className="character-panel">
                <h1>{latestProps.panel2.name || props.name}</h1>
                <img className="character-portrait" src={latestProps.panel2.image || props.image} alt={props.name} />
                <button onClick={() => toggleLock('panel2')}>{locked.panel2 ? 'Unlock' : 'Lock'}</button>
            </div>
            <div className="character-panel">
                <h1>{latestProps.panel3.name || props.name}</h1>
                <img className="character-portrait" src={latestProps.panel3.image || props.image} alt={props.name} />
                <button onClick={() => toggleLock('panel3')}>{locked.panel3 ? 'Unlock' : 'Lock'}</button>
            </div>
        </div>
    );
}

export default Character;