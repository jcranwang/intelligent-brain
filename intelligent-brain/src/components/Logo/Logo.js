import React from "react";
import Tilt from "react-tilt";
import icon from "./icon.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
            <img src={icon} alt="logo" style={{paddingTop:'10px'}}/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
