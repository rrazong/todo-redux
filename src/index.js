import React from 'react';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import {configureStore} from 'redux-starter-kit';
import {createLogger} from 'redux-logger';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import todos from './redux/modules/todos';
import goals from './redux/modules/goals';

const middleware = [
  ReduxThunk,
];
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    collapsed: true,
  });
  middleware.push(logger); // Logger must be last middleware
}

// App reducer
function isLoading(state = true, action) {
  switch(action.type) {
    case 'RECEIVED_DATA':
      return false;
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    todos,
    goals,
    isLoading,
  },
  middleware,
  devTools: true,
});


const Context = React.createContext();
const Provider = (props) => (
  <Context.Provider value={props.store}>
    {props.children}
  </Context.Provider>
);
const ConnectedApp = connect((state) => ({loading: state.loading}))(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// connect()
//   renders any component
//   passes it whatever data it requires from the store as props
//   passes dispatch as prop
function connect(mapStateToProps) {
  return (Component) => {
    class Receiver extends React.Component {
      componentWillMount() {
        this.props.store.subscribe(() => {
          this.unsubscribe = this.forceUpdate();
        })
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const {
          dispatch,
          getState,
        } = this.props.store;
        const state = getState();
        const stateNeeded = mapStateToProps(state);

        return (
          <Component
            {...stateNeeded}
            dispatch={dispatch}
          />
        );
      }
    }

    class ConnectedComponent extends React.Component {
      render() {
        return (
          <Context.Consumer>
            {(store) => (
              <Receiver store={store}/>
            )}
          </Context.Consumer>
        );
      }
    }

    return ConnectedComponent;
  }
}

export {
  Provider,
  connect
};
