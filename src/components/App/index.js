import { Component } from "react";
import Editor from "../Editor";
import Modal from "../Modal";
import Navbar from "../Navbar";
import Spinner from "../Spinner";
import Statistic from "../Statistic";

const TEXT_API = `https://baconipsum.com/api/?type=meat-and-filler&sentences=2`;

export default class App extends Component {
  state = {
    text: ``,
    position: 0,
    attempts: 0,
    corrects: 0,
    mistakes: 0,
    speed: 0,
    start: new Date(),
    finish: false,
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
      this.finish();
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

  getAccuracy = () => {
    const { attempts = 0, mistakes = 0 } = this.state;
    let accuracy;

    if (attempts > 0) {
      accuracy = mistakes > 0 ? 100 - (100 * mistakes) / attempts : 100;
    } else {
      accuracy = 0;
    }

    return accuracy.toFixed(2);
  };

  start = () => {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
    }

    this.speedInterval = setInterval(this.getSpeed, 1000);

    this.setState({
      start: new Date(),
    });
  };

  finish = () => {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
    }

    this.setState({
      finish: true,
    });
  };

  restart = (evt) => {
    this.updateText();
    this.start();

    evt.target.blur();
  };

  updateText() {
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
          finish: false,
        });
      });
  }

  componentDidMount() {
    this.updateText();

    document.addEventListener("keypress", this.onKeyDownHandler);
  }

  componentWillUnmount() {
    if (this.speedInterval) {
      clearInterval(this.speedInterval);
    }

    document.removeEventListener("keypress", this.onKeyDownHandler);
  }

  render() {
    const { text, position, correctKey = true, speed, finish } = this.state;

    const editorContent = text ? (
      <Editor text={text} position={position} wrongLetter={!correctKey} />
    ) : (
      <Spinner />
    );

    const finishBody = finish ? (
      <Modal
        title="Results"
        body={
          <>
            <p>Accuracy: {this.getAccuracy()}%</p>
            <p>Speed: {speed} symbols/min.</p>
          </>
        }
        button="RESTART"
        id="finishModal"
        onButtonHandler={this.restart}
      />
    ) : null;

    return (
      <div>
        <Navbar title="TYPEX" />
        <div className="container-fluid mt-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col-md-9">{editorContent}</div>
                <div className="col-md-3 border-start">
                  <Statistic
                    accuracy={this.getAccuracy()}
                    speed={speed}
                    onRestart={this.restart}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="Start"
          body="Press START to begin print!"
          button="START"
          id="startModal"
          onButtonHandler={this.start}
        />
        {finishBody}
      </div>
    );
  }
}
