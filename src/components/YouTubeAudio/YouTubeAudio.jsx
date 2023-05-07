import React from 'react';
import './YouTubeAudio.css';

const YouTubeAudio = ({ videoID }) => {
    return (
        <div className="youtube-audio">
            <iframe
                title="YouTube Video"
                width="640"
                height="360"
                src={`https://www.youtube.com/embed/${videoID}`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YouTubeAudio;