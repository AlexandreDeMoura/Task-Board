import React, { Component, Fragment } from "react";

import Header from "./components/Header";
import MainContainer from "./components/MainContainer";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkModeSelected: false
    };
  }

  changeThemeColor = () => {
    const darkOrNot = this.state.isDarkModeSelected;

    if (darkOrNot) {
      this.setState({
        isDarkModeSelected: false
      });
    } else {
      this.setState({
        isDarkModeSelected: true
      });
    }
  };

  render() {
    return (
      <Fragment>
        <Header
          changeThemeColor={this.changeThemeColor}
          isDarkModeSelected={this.state.isDarkModeSelected}
        />
        <MainContainer isDarkModeSelected={this.state.isDarkModeSelected} />
      </Fragment>
    );
  }
}

export default App;
