import React, { Component } from "react";

import UserInput from "./UserInput";
import FilteringMenu from "./FilteringMenu";
import TodoCard from "./TodoCard";

import PropTypes from "prop-types";

import "./styles/MainContainer.scss";
import "../App.scss";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: {},
      cardsDataContainer: [],
      arrayOfTodoCard: [],
      choosedFilteringOption: ""
    };
  }

  getCardData = (title, emergencyLevel, detail) => {
    this.setState(
      {
        cardData: {
          title: title,
          emergencyLevel: emergencyLevel,
          detail: detail,
          key: Date.now()
        }
      },
      () => this.pushNewCard()
    );
  };

  pushNewCard = () => {
    let cardsDataContainer = this.state.cardsDataContainer;
    let arrayOfTodoCard = this.state.arrayOfTodoCard;
    cardsDataContainer.push(this.state.cardData);
    arrayOfTodoCard.push(
      <TodoCard
        data={this.state.cardData}
        key={this.state.cardData.key}
        deleteCard={this.deleteCard}
      />
    );
    this.setState({
      cardsDataContainer: cardsDataContainer,
      arrayOfTodoCard: arrayOfTodoCard
    });
  };

  deleteCard = cardKey => {
    let newcardsDataContainer = this.state.cardsDataContainer.filter(
      cardData => cardData.key !== cardKey
    );

    let newArrayOfTodoCard = [];
    newcardsDataContainer.forEach(elem => {
      newArrayOfTodoCard.push(
        <TodoCard data={elem} key={elem.key} deleteCard={this.deleteCard} />
      );
    });

    this.setState({
      cardsDataContainer: newcardsDataContainer,
      arrayOfTodoCard: newArrayOfTodoCard
    });
  };

  getFilteringMenuInput = userInput => {
    this.setState(
      {
        choosedFilteringOption: userInput
      },
      () => this.filterTodoCards()
    );
  };

  filterTodoCards = () => {
    const choosedFilteringOption = this.state.choosedFilteringOption;
    let newcardsDataContainer = this.state.cardsDataContainer;

    if (
      choosedFilteringOption === "Title (ascending)" ||
      choosedFilteringOption === "Title (descending)"
    ) {
      newcardsDataContainer.sort((a, b) => a.title.localeCompare(b.title));
      if (choosedFilteringOption === "Title (descending)") {
        newcardsDataContainer.reverse();
      }
    } else {
      let lowEmergencyCards = [];
      let moderateEmergencyCards = [];
      let highEmergencyCards = [];
      let veryHighEmergencyCards = [];

      newcardsDataContainer.forEach(elem => {
        if (elem.emergencyLevel === "Low") {
          lowEmergencyCards.push(elem);
        } else if (elem.emergencyLevel === "Moderate") {
          moderateEmergencyCards.push(elem);
        } else if (elem.emergencyLevel === "High") {
          highEmergencyCards.push(elem);
        } else {
          veryHighEmergencyCards.push(elem);
        }
      });
      newcardsDataContainer = lowEmergencyCards.concat(
        moderateEmergencyCards,
        highEmergencyCards,
        veryHighEmergencyCards
      );

      if (choosedFilteringOption === "Urgency (descending)") {
        newcardsDataContainer.reverse();
      }
    }

    let newArrayOfTodoCard = [];
    newcardsDataContainer.forEach(elem => {
      newArrayOfTodoCard.push(
        <TodoCard data={elem} key={elem.key} deleteCard={this.deleteCard} />
      );
    });

    this.setState({
      cardsDataContainer: newcardsDataContainer,
      arrayOfTodoCard: newArrayOfTodoCard
    });
  };

  render() {
    return (
      <div
        className={`main-container ${
          this.props.isDarkModeSelected
            ? "darker-background"
            : "light-background"
        }`}
      >
        <div className="main-container__filtering-container">
          <UserInput
            isDarkModeSelected={this.props.isDarkModeSelected}
            getCardData={this.getCardData}
          />
          <FilteringMenu
            isDarkModeSelected={this.props.isDarkModeSelected}
            getFilteringMenuInput={this.getFilteringMenuInput}
          />
        </div>
        <div className="main-container__country-card-container">
          {this.state.arrayOfTodoCard}
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  isDarkModeSelected: PropTypes.bool.isRequired
};

export default MainContainer;
