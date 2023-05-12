import React, { useState, useEffect } from 'react';
import "./NavigationButtons.css";

const NavigationButtons = ({
    goToPreviousSlide,
    handleCharSelect,
    handleCharDeselect,
    selectedCharacters,
    goToNextSlide,
    scrollToRandomCharacter,
}) => {

    const [bgmPlaying, setBgmPlaying] = useState(false);
    const [audio, setAudio] = useState(null);
    const [videoPlaying, setVideoPlaying] = useState(true);

    // Function to toggle the background music playback
    const toggleBackgroundMusic = () => {
        if (bgmPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setBgmPlaying(!bgmPlaying);
    };

    // Handler for toggling the background music
    const handleBgmToggle = () => {
        toggleBackgroundMusic();
        // Remove focus from the clicked button to prevent unwanted key events
        document.activeElement.blur();
    };

    // Function to toggle video playback
    const toggleVideoPlayback = () => {
        setVideoPlaying(!videoPlaying);
        document.activeElement.blur();
    };



    useEffect(() => {
        // Create a new Audio object for the background music
        const bgmAudio = new Audio('./audio/bgm.mp3');
        bgmAudio.loop = true;
        setAudio(bgmAudio);

        return () => {
            bgmAudio.pause();
            bgmAudio.currentTime = 0;
        };
    }, []);



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
                <button onClick={handleBgmToggle}>
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