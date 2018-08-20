import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({onInputChange, onDetectChange}) => {
    return <div> 
        <p className="f3">
          {"Detect faces in a picture. Please upload your picture here."}
        </p>
        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input className="f4 pa2 w-70 center" type="text" onInput={onInputChange}/>
            <button className="w-30 grow f4 link ph3 pv2 dib black bg-light-blue" onClick={onDetectChange}>
              Detect
            </button>
          </div>
        </div>
      </div>;
};

export default ImageLinkForm;