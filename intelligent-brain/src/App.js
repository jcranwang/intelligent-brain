import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import PictureArea from "./components/PictureArea/PictureArea";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import "./App.css";

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

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignIn: false,
  userProfile: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joinedDate: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  receiveUserProfile = user => {
    this.setState({
      userProfile: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joinedDate: user.joinedDate
      }
    });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isSignIn: true });
    } else if (route === "signin") {
      this.setState(initialState);
    }
    this.setState({ route: route });
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
    fetch("http://localhost:3001/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.userProfile.id
            })
          })
            .then(response => response.json())
            .then(entryCount => {
              this.setState(
                Object.assign(this.state.userProfile, { entries: entryCount })
              );
            })
            .catch(console.log);
          this.showFaceBox(this.calculateFaceBox(response));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { box, imageURL, route, isSignIn, userProfile } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleParams} />
        <Navigation onRouteChange={this.onRouteChange} isSignIn={isSignIn} />
        <Logo />
        {route === "home" ? (
          <div>
            <Rank
              userName={userProfile.name}
              userEntries={userProfile.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onDetectChange={this.onDetectChange}
            />
            <PictureArea box={box} imageURL={imageURL} />
          </div>
        ) : route === "register" ? (
          <Register
            onRouteChange={this.onRouteChange}
            receiveUserProfile={this.receiveUserProfile}
          />
        ) : (
          <SignIn
            onRouteChange={this.onRouteChange}
            receiveUserProfile={this.receiveUserProfile}
          />
        )}
      </div>
    );
  }
}

export default App;
