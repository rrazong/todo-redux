const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

export default function reducer(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    case 'RECEIVED_DATA': // TODO import RECEIVED_DATA from api duck?
      return action.goals;
    default:
      return state;
  }
};

export function handleAddGoalAction(name, cb) {
  return (dispatch) => {
    return window.API.saveGoal(name)
      .then((goal) => {
        dispatch(addGoalAction(goal));
        cb();
      })
      .catch(() => {
        alert('Adding Goal failed');
      });
  }
}

function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal
  };
}

export function handleRemoveGoalAction(goal) {
  return (dispatch) =>  {
    dispatch(removeGoalAction(goal.id));
    return window.API.deleteGoal(goal.id)
      .catch(() => {
        alert('Deleting Goal failed');
        dispatch(addGoalAction(goal));
      });
  }
}

function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  };
}
