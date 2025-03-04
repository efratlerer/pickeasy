import React, { useState, useRef } from 'react';

export default function About() {
  const videoRef = useRef(null);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "8%", }}>

      <div style={{ flex: "1", marginTop: "0%", }}>
        <img style={{ width: "70%" }} src="images/Promotional film.jpeg"></img>
      </div>
      {/* קונטיינר הסרטון */}
      <div style={{ flex: "1" }}>
        <video
          ref={videoRef}
          autoPlay

          controls
          style={{ width: '200%', position: "inherit", height: "20%", width: "80%", marginTop: "0%" }}
        >
          <source
            src="video/pickeasy (1).mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

    </div>
  );
}
