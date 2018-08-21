import React from "react";
import "./PictureArea.css";

const PictureArea = ({ imageURL, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="imageTarget"
          src={imageURL}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="boundingBox"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        />
      </div>
    </div>
  );
};

export default PictureArea;
