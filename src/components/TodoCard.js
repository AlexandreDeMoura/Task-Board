import React, { Component } from "react";

import DeleteCard from "../images/delete-card.svg";

import PropTypes from "prop-types";

import "./styles/TodoCard.scss";

class TodoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardHovered: false
    };
  }

  handleMouseEnter = () => {
    this.setState({
      isCardHovered: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      isCardHovered: false
    });
  };

  chooseBackground = () => {
    switch (this.props.data.emergencyLevel) {
      case "Low":
        return "green-bg";
      case "Moderate":
        return "yellow-bg";
      case "High":
        return "orange-bg";
      case "Very High":
        return "red-bg";
      default:
        break;
    }
  };

  handleClickButton = () => {
    this.props.deleteCard(this.props.data.key);
  };

  render() {
    return (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className={`todo-card ${this.chooseBackground()}`}
      >
        <h3 className="todo-card__todo-title">{this.props.data.title}</h3>
        <p className="todo-card__emergency-level">
          Emergency level: {this.props.data.emergencyLevel}
        </p>
        <p className="todo-card__todo-details">
          {this.props.data.detail
            ? this.props.data.detail
            : "No additional information"}
        </p>
        {this.state.isCardHovered ? (
          <img
            onClick={this.handleClickButton}
            className="light-circle"
            src={DeleteCard}
            alt="delete"
          />
        ) : (
          undefined
        )}
      </div>
    );
  }
}

TodoCard.propTypes = {
  data: PropTypes.object.isRequired,
  deleteCard: PropTypes.func.isRequired
};

export default TodoCard;
