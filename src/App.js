import React, {Component} from 'react';
import {connect} from './index';
import Todos from './components/Todos';
import Goals from './components/Goals';
// import complaintsLogo from './logo.svg'; // TODO: Add a favicon
import './App.css';
import './mockApi';

const RECEIVED_DATA = 'RECEIVED_DATA';

function handleInitialData() {
  return (dispatch) => {
    return Promise
      .all([
        window.API.fetchTodos(),
        window.API.fetchGoals(),
      ])
      .then(([todos, goals]) => {
        dispatch(receivedDataAction(todos, goals));
      })
  };
}

function receivedDataAction(todos, goals) {
  return {
    type: RECEIVED_DATA,
    todos,
    goals,
  };
}

class App extends Component {
  componentWillMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const {isLoading} = this.props

    if (isLoading) {
      return (
        <p>Loading...</p>
      );
    }

    return (
      <div className="App">
        <ConnectedTodos />
        <ConnectedGoals />
      </div>
    );
  }
}

const ConnectedTodos = connect((state) => ({todos: state.todos}))(Todos);
const ConnectedGoals = connect((state) => ({goals: state.goals}))(Goals);

export default App;
