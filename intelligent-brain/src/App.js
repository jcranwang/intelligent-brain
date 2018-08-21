import React, { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import PictureArea from "./components/PictureArea/PictureArea";
import Particles from "react-particles-js";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "e76a8e930e804979ab2d0de0bbfb598a"
});

const particleParams = {
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 700,
        line_linked: {
          shadow: {
            enable: true,
            color: "#ffffff",
            blur: 10
          }
        }
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
    };
  }

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  calculateFaceBox = data => {
    const clarifaiBox =
      data.rawData.outputs[0].data.regions[0].region_info.bounding_box;
    const targetPic = document.getElementById("imageTarget");
    const picWidth = Number(targetPic.width);
    const picHeight = Number(targetPic.height);
    return {
      leftCol: clarifaiBox.left_col * picWidth,
      topRow: clarifaiBox.top_row * picHeight,
      rightCol: picWidth - clarifaiBox.right_col * picWidth,
      bottomRow: picHeight - clarifaiBox.bottom_row * picHeight
    };
  };

  showFaceBox = box => {
    this.setState({ box: box });
  };

  onDetectChange = event => {
    this.setState({ imageURL: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>
        this.showFaceBox(this.calculateFaceBox(response)).catch(err =>
          console.log(err)
        )
      );
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particleParams} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onDetectChange={this.onDetectChange}
        />
        <PictureArea box={this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
