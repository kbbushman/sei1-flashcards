import React, { Component } from 'react';
import Definition from './Definition';

class Flashcard extends Component {
  // LIFECYCLE METHOD
  // Behind the scenes, we have a constructor that is called before the Render or componentDidMount lifecycles
  state = {
    time: 3,
    timer: null,
    showDef: false,
  };
 
  // This function will be called every second by setInterval, and will reduce our "time" state value by one or call for the next card
  decrementTime = () => {
    // If time reaches 1, tell the parent component (FlashcardContainer) to pass a new card via props
    if (this.state.time <= 1) {
      this.props.next();
    } else {
      // If time is greater than 1, just reduce our "time" state value by one and reset the inteval
      clearInterval(this.state.timer);
      this.setState(prevState => ({
        time: prevState.time - 1,
        timer: window.setInterval(this.decrementTime, 1000)
      }));
    };
  };

  // LIFECYCLE METHOD
  // Do something as soon as our DOM has rendered
  componentDidMount() {
    // Start the timer as soon as we mount to the DOM
    this.setState({ timer: window.setInterval(this.decrementTime, 1000) });
  };

  // LIFECYCLE METHOD
  // Check props and state on update
  componentDidUpdate(prevProp, prevState) {
    // If this component receives new data, via props (or state), reset time and timer function
    if (prevProp.data !== this.props.data) {
      clearInterval(this.state.timer);
      this.setState({
        time: 3,
        timer: window.setInterval(this.decrementTime, 1000)
      });
    };

    // If time reaches 1 and we do not receive new data, stop timer
    if (prevState.time === 1 && this.state.time === 1 && prevProp.data !== this.props.data) {
      clearInterval(this.state.timer);
    };
  };

  // LIFECYCLE METHOD
  // Remove interval before removing this component from the DOM
  componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }

  // Toggle show definition
  toggleDef = () => {
    this.setState(prevState => ({
      showDef: !prevState.showDef
    }));
  };

  // LIFECYCLE METHOD
  // Render is called before the component is mounted to the DOM, and after every state or prop change
  render() {
  let { data } = this.props;
  let defs = this.props.data.definitions[0].definitions;
  // console.log(defs);

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <div>Time: { this.state.time }</div>
            <h2>{data.word}</h2>
            <div className="card-action">
              <button className='waves-effect waves-light btn' onClick={this.toggleDef}>{this.state.showDef ? 'Hide Definition' : 'Show Definition'}</button>
            </div>
          </div>
        </div>
        <div className="card">
          {this.state.showDef && defs.map((def, idx) => <Definition def={def} key={idx} index={idx} />)}
        </div>
      </div>
    );
  };
};

export default Flashcard
