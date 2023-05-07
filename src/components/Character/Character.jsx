import React from 'react';
import './Character.css';

function Character(props) {
    return (
        <div className="characters-container">
            <div className="character-panel">
                <h1>{props.name}</h1>
                <img className="character-portrait" src={props.image} alt={props.name} />
            </div>
            <div className="character-panel">
                <h1>{props.name}</h1>
                <img className="character-portrait" src={props.image} alt={props.name} />
            </div>
            <div className="character-panel">
                <h1>{props.name}</h1>
                <img className="character-portrait" src={props.image} alt={props.name} />
            </div>
        </div>
    );
}

export default Character;