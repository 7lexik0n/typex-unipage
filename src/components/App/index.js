import { Component } from "react";
import Editor from "../Editor";
import Statistic from "../Statistic";

const TEXT_API = `https://baconipsum.com/api/?type=meat-and-filler`;

export default class App extends Component {
  state = {
    text: `Loading...`,
    position: 0,
    attempts: 0,
    corrects: 0,
    mistakes: 0,
    speed: 0,
    start: new Date(),
  };

  onKeyDownHandler = (evt) => {
    const { text, position } = this.state;

    if (evt.key === text[position]) {
      this.onCorrectKeyHandler();
    } else {
      this.onWrongKeyHandler();
    }
  };

  onCorrectKeyHandler = () => {
    const { text, position, attempts, corrects } = this.state;

    if (position === text.length - 1) {
      return;
    }

    this.setState({
      correctKey: true,
      corrects: corrects + 1,
      attempts: attempts + 1,
      position: position + 1,
    });
  };

  onWrongKeyHandler = () => {
    const { attempts, mistakes, correctKey } = this.state;

    if (!correctKey) {
      return;
    }

    this.setState({
      correctKey: false,
      attempts: attempts + 1,
      mistakes: mistakes + 1,
    });
  };

  getSpeed = () => {
    const { start, corrects } = this.state;
    const timeDiff = (new Date() - start) / 1000;

    const speed = Math.round((corrects * 60) / timeDiff);

    this.setState({ speed });
  };

  updateText() {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
    }

    fetch(TEXT_API)
      .then((response) => response.json())
      .then((result) => {
        const text = result.join(` `);

        this.setState({
          text,
          position: 0,
          attempts: 0,
          corrects: 0,
          mistakes: 0,
          speed: 0,
          start: new Date(),
        });
        
        this.speedInterval = setInterval(this.getSpeed, 1000);
      });
  }

  componentDidMount() {
    this.updateText();

    document.addEventListener("keypress", this.onKeyDownHandler);
  }

  componentWillUnmount() {
    clearInterval(this.speedInterval);

    document.removeEventListener("keypress", this.onKeyDownHandler);
  }

  render() {
    const {
      text,
      position,
      correctKey = true,
      attempts,
      mistakes,
      speed
    } = this.state;

    return (
      <div>
        <h1>TYPEX</h1>
        <Editor text={text} position={position} wrongLetter={!correctKey} />
        <Statistic attempts={attempts} mistakes={mistakes} speed={speed} />
      </div>
    );
  }
}
