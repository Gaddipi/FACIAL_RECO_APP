import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import "./App.css";
import Clarifai from "clarifai";
import Particles from "react-particles-js";
import SignIn from './components/SignIn/SignIn';
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Register from './components/Register/Register'

const app = new Clarifai.App({
  apiKey: "09315c08d5704cad9205ef84b580ea01",
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
  url: "path/to/svg.svg",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false
    };
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response)).catch((err) =>
          console.log(err)
        )
      );
  };

  onRouteChange = (route) => {
    if( route === 'signout') {
      this.setState({isSignedIn: false})
    }else if( route === 'home'){
      this.setState({isSignedIn: true})
    } 
      this.setState({route: route})
    }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {        
          this.state.route === 'home' ?
          <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                  onButtonSubmit={this.onSubmit}
                  onInputChange={this.onInputChange}/>
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
              </div>
          : ( 
            this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}

export default App;
