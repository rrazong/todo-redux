import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {handleAddTodoAction, handleToggleTodoAction, handleRemoveTodoAction} from '../../redux/modules/todos';
import List from '../List';

export default class Todos extends Component {
  addTodo = () => {
    const name = this.input.value;
    this.props.dispatch(handleAddTodoAction(
      name,
      () => { this.input.value = '' }
    ));
  }

  toggleTodo = (todo) => {
    this.props.dispatch(handleToggleTodoAction(todo));
  }

  removeTodo = (todo) => {
    this.props.dispatch(handleRemoveTodoAction(todo));
  }

  render() {
    return (
      <div>
        <h1>To Dos</h1>
        <input id="todo" type="text" placeholder="Add todo here"
          ref={(input) => this.input = input}
        ></input>
        <Button id="todoBtn" variant="contained" color="primary" onClick={this.addTodo}>Add</Button>
        <List items={this.props.todos} remove={this.removeTodo} toggle={this.toggleTodo}/>
      </div>
    );
  }
}

