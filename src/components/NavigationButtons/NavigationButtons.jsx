import React, { useState, useEffect } from 'react';
import "./NavigationButtons.css";

const NavigationButtons = ({
    goToPreviousSlide,
    handleCharSelect,
    handleCharDeselect,
    selectedCharacters,
    goToNextSlide,
}) => {

    // State to track whether the background music (BGM) is currently playing
    const [bgmPlaying, setBgmPlaying] = useState(false);
    // State to store the audio object for the BGM
    const [audio, setAudio] = useState(null);
    // State to track video playback
    const [videoPlaying, setVideoPlaying] = useState(true);

    // Function to toggle the background music playback
    const toggleBackgroundMusic = () => {
        if (bgmPlaying) {
            // Pause the BGM if it is currently playing
            audio.pause();
        } else {
            // Play the BGM if it is currently paused
            audio.play();
        }
        // Toggle the BGM playing state
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
    };



    useEffect(() => {
        // Create a new Audio object for the background music
        const bgmAudio = new Audio('./audio/bgm.mp3');
        // Set the loop property to true to continuously play the BGM
        bgmAudio.loop = true;
        // Set the audio object in the state
        setAudio(bgmAudio);

        return () => {
            // Clean up the audio object when the component unmounts
            bgmAudio.pause();
            bgmAudio.currentTime = 0;
        };
    }, []);



    return (
        <div className="navigation-buttons">
            {/* Button to go to the previous slide */}
            <button onClick={goToPreviousSlide} className="left-button">
                ◄
            </button>
            {/* Button to handle character selection */}
            <button onClick={handleCharSelect} disabled={selectedCharacters.length >= 3}>
                Select
            </button>
            {/* Button to toggle video playback */}
            <button onClick={toggleVideoPlayback}>
                Video
            </button>
            {/* Button to toggle the background music */}
            <button onClick={handleBgmToggle}>
                BGM
            </button>
            {/* Button to handle character deselection */}
            <button onClick={handleCharDeselect} disabled={selectedCharacters.length === 0}>
                Deselect
            </button>
            {/* Button to go to the next slide */}
            <button onClick={goToNextSlide} className="right-button">
                ►
            </button>
            {/* Video element with conditional playback */}
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