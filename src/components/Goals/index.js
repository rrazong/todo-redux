import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {handleAddGoalAction, handleRemoveGoalAction} from '../../redux/modules/goals';
import List from '../List';

export default class Goals extends Component {
  addGoal = () => {
    const name = this.input.value;
    this.props.dispatch(handleAddGoalAction(
      name,
      () => { this.input.value = '' }
    ));
  }

  removeGoal = (goal) => {
    this.props.dispatch(handleRemoveGoalAction(goal));
  }

  render() {
    return (
      <div>
        <h1>Goals</h1>
        <input id="goal" type="text" placeholder="Add goal here"
          ref={(input) => {this.input = input}}
        ></input>
        <Button id="goalBtn" variant="contained" color="primary" onClick={this.addGoal}>Add</Button>
        <List items={this.props.goals} remove={this.removeGoal} />
      </div>
    );
  }
}

