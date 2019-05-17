import React from "react";

import DarkModeOff from "../images/dark-mode-off.svg";
import DarkModeOn from "../images/dark-mode-on.svg";

import PropTypes from "prop-types";

import "./styles/Header.scss";

const Header = props => {
  return (
    <header
      className={
        props.isDarkModeSelected ? "dark-background" : "lighter-background"
      }
    >
      <h1 className={props.isDarkModeSelected ? "light-font" : "darker-font"}>
        Task to handle
      </h1>
      <div>
        <img
          src={props.isDarkModeSelected ? DarkModeOn : DarkModeOff}
          alt="dark icon"
        />
        <p
          className={props.isDarkModeSelected ? "light-font" : "darker-font"}
          onClick={props.changeThemeColor}
        >
          Dark Theme
        </p>
      </div>
    </header>
  );
};

Header.propTypes = {
  changeThemeColor: PropTypes.func.isRequired,
  isDarkModeSelected: PropTypes.bool.isRequired
};

export default Header;
