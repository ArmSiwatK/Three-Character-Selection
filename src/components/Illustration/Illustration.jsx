import React, { useState } from 'react';
import './Illustration.css';

function Illustration() {
    const [selectedFace, setSelectedFace] = useState(null);

    const faceCoordinates = [
        { x: 1228, y: 197, frameSize: 60 }, //Reimu
        { x: 710, y: 405, frameSize: 80 }, //Marisa
    ];

    const getFrameStyle = (selectedFace) => {
        if (selectedFace === null) {
            return null;
        }

        const { x, y, frameSize } = faceCoordinates[selectedFace];
        return {
            top: `${y + 75}px`,
            left: `${x + 75}px`,
            width: `${frameSize}px`,
            height: `${frameSize}px`
        };
    };

    const handleFaceClick = (faceIndex) => {
        if (selectedFace === faceIndex) {
            setSelectedFace(null);
        } else {
            setSelectedFace(faceIndex);
        }
    };

    return (
        <div id="illustration-container">
            <img id="illustration" src="./illustration.jpg" useMap="#faces" alt="Illustration" />
            {selectedFace !== null && (
                <div className="frame" style={getFrameStyle(selectedFace)} onClick={() => handleFaceClick(selectedFace)} />
            )}
            <map name="faces">
                <area shape="circle" coords={`${faceCoordinates[0].x},${faceCoordinates[0].y},${faceCoordinates[0].frameSize}`} onClick={() => handleFaceClick(0)} />
                <area shape="circle" coords={`${faceCoordinates[1].x},${faceCoordinates[1].y},${faceCoordinates[1].frameSize}`} onClick={() => handleFaceClick(1)} />
            </map>
        </div>
    );
}

export default Illustration;