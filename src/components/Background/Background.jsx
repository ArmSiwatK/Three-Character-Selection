import React from "react";
import "./Background.css";

function Background() {
    return (
        <>
            <video className="background-video" autoPlay loop muted>
                <source src="./background.mp4" type="video/mp4" />
            </video>
            <div className="gradient-overlay"></div>
        </>
    );
}

export default Background;