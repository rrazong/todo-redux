const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) => todo.id === action.id
        ? Object.assign({}, todo, {complete: !todo.complete})
        : todo
      );
    case 'RECEIVED_DATA': // TODO import RECEIVED_DATA from api duck?
      return action.todos;
    default:
      return state;
  }
};

// Action creators

export function handleAddTodoAction(name, cb) {
  return (dispatch) => {
    return window.API.saveTodo(name)
      .then((todo) => {
        dispatch(addTodoAction(todo));
        cb();
      })
      .catch(() => {
        alert('Adding Todo failed');
      });
  };
}

function addTodoAction(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

export function handleToggleTodoAction(todo) {
  return (dispatch) => {
    dispatch(toggleTodoAction(todo.id));
    return window.API.saveTodoToggle(todo.id)
      .catch(() => {
        dispatch(toggleTodoAction(todo.id));
        alert('Toggling Todo failed');
      });
  }
}

function toggleTodoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  };
}

export function handleRemoveTodoAction(todo) {
  return (dispatch) => {
    dispatch(removeTodoAction(todo.id));
    return window.API.deleteTodo(todo.id)
      .catch(() => {
        dispatch(addTodoAction(todo));
        alert('Deleting Todo failed');
      });
  }
}

function removeTodoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  };
}
