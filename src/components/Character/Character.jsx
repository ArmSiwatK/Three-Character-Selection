import React from 'react';
import './Character.css';

function Character(props) {
    return (
        <div className="character-container">
            <div className="character-container-details">
                <h1 className="character-name">{props.name}</h1>
                <img className="character-portrait-responsive" src={props.image} alt={props.name} />
                <p className="character-description">{props.description}</p>
                <div className="character-buttons">
                    <button type="button" onClick={props.prevSlide}>
                        Prev
                    </button>
                    <button type="button" onClick={props.nextSlide}>
                        Next
                    </button>
                </div>
            </div>
            <img className="character-portrait" src={props.image} alt={props.name} />
        </div>
    );
}

export default Character;