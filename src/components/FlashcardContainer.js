import React, { Component } from "react";
import axios from 'axios';
import Flashcard from "./Flashcard";
import { CLIENT_URL } from "../constants.js";

class FlashcardContainer extends Component {
  state = {
    flashcards: [],
    currentIndex: 0,
    errors: null,
  }

  next = () => {
    let nextIndex;
    if (this.state.currentIndex + 1 === this.state.flashcards.length) {
      nextIndex = this.state.currentIndex;
    } else {
      nextIndex = this.state.currentIndex + 1;
    }
    this.setState({ currentIndex: nextIndex });
  }

  prev = () => {
    let prevIndex;
    if (this.state.currentIndex - 1 < 0) {
      prevIndex = 0;
    } else {
      prevIndex = this.state.currentIndex - 1;
    }
    this.setState({ currentIndex: prevIndex })
  }

  handleKeyUp = event => {
    if (event.keyCode === 39) return this.next();
    if (event.keyCode === 37) return this.prev();
  }

  // LIFECYCLE METHOD
  componentDidMount() {
    // Listen for left & right arrow key press
    window.addEventListener('keyup', this.handleKeyUp);

    // Get words and definitions from API
    axios.get(CLIENT_URL)
      .then((response) => {
        console.log(response.data);
        this.setState({
          flashcards: response.data
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          errors: error
        })
      });
      console.log('STATE = ', this.state);
  }

  // LIFECYCLE METHOD
  // Remove event listener before removing this component from the DOM
  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  // LIFECYCLE METHOD
  render() {
    // console.log('STATE = ', this.state);
    let flashcard = this.state.flashcards[this.state.currentIndex];

    return (
      <main>
        <div className="row">
          <div className="container">
            {flashcard && <Flashcard data={flashcard} next={this.next} />}
          </div>
        </div>
      </main>
    );
  }
}

export default FlashcardContainer;
