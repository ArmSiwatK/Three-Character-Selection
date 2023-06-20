import React, { useState, useEffect } from 'react';
import './NavigationButtons.css';

const NavigationButtons = ({
    goToPreviousSlide,
    handleCharSelect,
    handleCharDeselect,
    selectedCharacters,
    goToNextSlide,
    scrollToRandomCharacter,
}) => {

    /*
    < --------------- States --------------- >
    */

    const [bgmPlaying, setBgmPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [videoPlaying, setVideoPlaying] = useState(true);

    /*
    < --------------- Functions --------------- >
    */

    const toggleBackgroundMusic = () => {
        bgmPlaying ? audio.pause() : audio.play();
        setBgmPlaying(!bgmPlaying);
        document.activeElement.blur();
    };

    const toggleVideoPlayback = () => {
        setVideoPlaying(!videoPlaying);
        document.activeElement.blur();
    };

    /*
    < --------------- useEffect Hook --------------- >
    */

    // Create new Audio object for the background music
    useEffect(() => {
        const bgmAudio = new Audio('./audio/bgm.mp3');
        bgmAudio.loop = true;
        setAudio(bgmAudio);

        return () => {
            bgmAudio.pause();
            bgmAudio.currentTime = 0;
        };
    }, []);

    /*
    < --------------- JSX Structure --------------- >
    */

    return (
        <div className="navigation-buttons">
            <div className="navigation-buttons-row">
                <button onClick={goToPreviousSlide} className="left-button">
                    ◄
                </button>
                <button onClick={handleCharSelect} disabled={selectedCharacters.length >= 3}>
                    Select
                </button>
                <button onClick={toggleVideoPlayback}>
                    Video
                </button>
                <button onClick={scrollToRandomCharacter}>
                    Random
                </button>
                <button onClick={toggleBackgroundMusic}>
                    BGM
                </button>
                <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                    Deselect
                </button>
                <button onClick={goToNextSlide} className="right-button">
                    ►
                </button>
            </div>

            {videoPlaying && (
                <video className="background-video" autoPlay loop muted>
                    <source src="./background.mp4" type="video/mp4" />
                </video>
            )}

            <div className="gradient-overlay"></div>
        </div>
    );
};

export default NavigationButtons;