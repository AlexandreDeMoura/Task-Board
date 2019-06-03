import React, { Component } from "react";

import CloseBlack from "../images/close-black.svg";
import CloseWhite from "../images/close-white.svg";

import PropTypes from "prop-types";

import "./styles/UserInput.scss";

class UserInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputTitle: "",
      userInputDetails: "",
      emergencyToActivate: "",
      isInputBarClicked: false
    };
  }

  handleChange = event => {
    this.setState({
      userInputTitle: event.target.value
    });
  };

  handleDeleteText = () => {
    this.setState({
      userInputTitle: ""
    });
  };

  handleClickInput = () => {
    this.setState({
      isInputBarClicked: true
    });
  };

  handleDetailChange = event => {
    this.setState({
      userInputDetails: event.target.value
    });
  };

  handleCancelClick = event => {
    event.preventDefault();
    this.setState({
      isInputBarClicked: false
    });
  };

  handleButtonSubmitClick = event => {
    event.preventDefault();
    const {
      userInputTitle,
      emergencyToActivate,
      userInputDetails
    } = this.state;

    if (userInputTitle && emergencyToActivate) {
      this.props.getCardData(
        userInputTitle,
        emergencyToActivate,
        userInputDetails
      );
      this.setState({
        isInputBarClicked: false,
        userInputTitle: "",
        userInputDetails: "",
        emergencyToActivate: ""
      });
    }
  };

  render() {
    return (
      <div
        className={`user-input ${
          this.props.isDarkModeSelected
            ? "dark-background"
            : "lighter-background"
        }`}
      >
        <input
          onClick={this.handleClickInput}
          className={
            this.props.isDarkModeSelected
              ? "dark-background light-font"
              : "lighter-background dark-font"
          }
          onChange={this.handleChange}
          placeholder="Give a title to your task"
          value={this.state.userInputTitle}
        />
        {this.state.userInputTitle ? (
          <img
            onClick={this.handleDeleteText}
            className="user-input__delete"
            src={this.props.isDarkModeSelected ? CloseWhite : CloseBlack}
            alt="delete"
          />
        ) : (
          undefined
        )}
        {this.state.isInputBarClicked ? (
          <div
            className={`user-input__details-container ${
              this.props.isDarkModeSelected
                ? "dark-background"
                : "lighter-background"
            }`}
          >
            <div className="user-input__urgency-level-container">
              <p
                className={
                  this.props.isDarkModeSelected ? "light-font" : "darker-font"
                }
              >
                Choose the emergency level of the task:
              </p>
              <ul>
                <li
                  onClick={() =>
                    this.setState({
                      emergencyToActivate: "Low"
                    })
                  }
                  className={
                    this.state.emergencyToActivate === "Low"
                      ? "green-lock"
                      : "green"
                  }
                >
                  Low
                </li>
                <li
                  onClick={() =>
                    this.setState({
                      emergencyToActivate: "Moderate"
                    })
                  }
                  className={
                    this.state.emergencyToActivate === "Moderate"
                      ? "yellow-lock"
                      : "yellow"
                  }
                >
                  Moderate
                </li>
                <li
                  onClick={() =>
                    this.setState({
                      emergencyToActivate: "High"
                    })
                  }
                  className={
                    this.state.emergencyToActivate === "High"
                      ? "orange-lock"
                      : "orange"
                  }
                >
                  High
                </li>
                <li
                  onClick={() =>
                    this.setState({
                      emergencyToActivate: "Very High"
                    })
                  }
                  className={
                    this.state.emergencyToActivate === "Very High"
                      ? "red-lock"
                      : "red"
                  }
                >
                  Very High
                </li>
              </ul>
            </div>
            <br />
            <textarea
              value={this.state.userInputDetails}
              onChange={this.handleDetailChange}
              placeholder="Give details about your task (optional)"
              className={
                this.props.isDarkModeSelected
                  ? "dark-background light-font light-border"
                  : "lighter-background dark-front darker-border"
              }
            />
            <div className="user-input__buttons-container">
              <button
                className={`user-input__cancel-button ${
                  this.props.isDarkModeSelected ? "light-font" : "darker-font"
                }`}
                onClick={this.handleCancelClick}
              >
                Cancel
              </button>
              <button
                className={
                  this.state.userInputTitle && this.state.emergencyToActivate
                    ? undefined
                    : "user-input__button-off"
                }
                onClick={this.handleButtonSubmitClick}
              >
                Create
              </button>
            </div>
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

UserInput.propTypes = {
  getCardData: PropTypes.func.isRequired,
  isDarkModeSelected: PropTypes.bool.isRequired
};

export default UserInput;
