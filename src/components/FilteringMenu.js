import React, { Component } from "react";

import BlackArrowUp from "../images/black-arrow-up.svg";
import BlackArrowDown from "../images/black-arrow-down.svg";
import WhiteArrowUp from "../images/white-arrow-up.svg";
import WhiteArrowDown from "../images/white-arrow-down.svg";

import PropTypes from "prop-types";

import "./styles/FilteringMenu.scss";

class FilteringMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      choosedFilteringOption: ""
    };
  }

  handleClick = () => {
    if (this.state.isClicked) {
      this.setState({
        isClicked: false
      });
    } else {
      this.setState({
        isClicked: true
      });
    }
  };

  handleOptionClick = optionValue => {
    this.props.getFilteringMenuInput(optionValue);
    this.setState({
      isClicked: false,
      choosedFilteringOption: optionValue
    });
  };

  mountArrow = () => {
    const isClicked = this.state.isClicked;
    const isDark = this.props.isDarkModeSelected;

    if (isClicked) {
      if (isDark) {
        return WhiteArrowUp;
      } else {
        return BlackArrowUp;
      }
    } else {
      if (isDark) {
        return WhiteArrowDown;
      } else {
        return BlackArrowDown;
      }
    }
  };

  render() {
    return (
      <div
        onClick={this.handleClick}
        className={`filtering-menu ${
          this.props.isDarkModeSelected
            ? "dark-background"
            : "lighter-background"
        }`}
      >
        <p
          className={
            this.props.isDarkModeSelected ? "light-font" : "darker-font"
          }
        >
          {!this.state.choosedFilteringOption
            ? "Filter by ..."
            : this.state.choosedFilteringOption}
        </p>
        <img
          className="filtering-menu__image"
          src={this.mountArrow()}
          alt="arrow"
        />
        {this.state.isClicked ? (
          <div
            className={`filtering-menu__options-container ${
              this.props.isDarkModeSelected
                ? "dark-background light-font"
                : "lighter-background dark-font"
            }`}
          >
            <p
              className={
                this.props.isDarkModeSelected ? "dark-hover" : "light-hover"
              }
              onClick={() => this.handleOptionClick("Urgency (ascending)")}
            >
              Urgency (ascending)
            </p>
            <p
              className={
                this.props.isDarkModeSelected ? "dark-hover" : "light-hover"
              }
              onClick={() => this.handleOptionClick("Urgency (descending)")}
            >
              Urgency (descending)
            </p>
            <p
              className={
                this.props.isDarkModeSelected ? "dark-hover" : "light-hover"
              }
              onClick={() => this.handleOptionClick("Title (ascending)")}
            >
              Title (ascending)
            </p>
            <p
              className={
                this.props.isDarkModeSelected ? "dark-hover" : "light-hover"
              }
              onClick={() => this.handleOptionClick("Title (descending)")}
            >
              Title (descending)
            </p>
          </div>
        ) : (
          undefined
        )}
      </div>
    );
  }
}

FilteringMenu.propTypes = {
  getFilteringMenuInput: PropTypes.func.isRequired,
  isDarkModeSelected: PropTypes.bool.isRequired
};

export default FilteringMenu;
