import React, { useState, useEffect } from 'react';
import "./NavigationButtons.css";

const NavigationButtons = ({ goToPreviousSlide, handleCharSelect, handleCharDeselect, selectedCharacters, goToNextSlide }) => {
    const [bgmPlaying, setBgmPlaying] = useState(false);
    const [audio, setAudio] = useState(null);



    const toggleBackgroundMusic = () => {
        if (bgmPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setBgmPlaying(!bgmPlaying);
    };

    const handleBgmToggle = () => {
        toggleBackgroundMusic();
    };



    useEffect(() => {
        const bgmAudio = new Audio('./bgm.mp3');
        bgmAudio.loop = true;
        setAudio(bgmAudio);

        return () => {
            bgmAudio.pause();
            bgmAudio.currentTime = 0;
        };
    }, []);



    return (
        <div className="navigation-buttons">
            <button onClick={goToPreviousSlide} className="left-button">
                ◄
            </button>
            <button onClick={handleCharSelect} disabled={selectedCharacters.length >= 3}>
                Select
            </button>
            <button onClick={handleBgmToggle}>
                {bgmPlaying ? 'Pause BGM' : 'Play BGM'}
            </button>
            <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                Deselect
            </button>
            <button onClick={goToNextSlide} className="right-button">
                ►
            </button>
        </div>
    );
};

export default NavigationButtons;