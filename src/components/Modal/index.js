import { Component } from "react";
import bootstrap from "bootstrap/dist/js/bootstrap";

export default class Modal extends Component {
  componentDidMount() {
    const { id = "myModal" } = this.props;

    this.modalElement = new bootstrap.Modal(document.getElementById(id));

    this.modalElement.show();
  }

  start = () => {
    this.modalElement.hide();

    this.props.onButtonHandler();
  }

  render() {
    const {
      title = "Modal title",
      body = "Modal body",
      button = "OK",
      id = "myModal",
    } = this.props;

    return (
      <div className="modal" id={id} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {body}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.start}
              >
                {button}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
