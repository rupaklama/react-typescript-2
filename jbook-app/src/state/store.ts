// Using other function from Redux - createStore ()
// to put all Reducers into the Redux Store object & create Global State object
// applyMiddleware - to add middleware like redux thunk & others
import { createStore, applyMiddleware } from 'redux';

// redux dev tool library
import { composeWithDevTools } from 'redux-devtools-extension';

// redux thunk middleware
import thunk from 'redux-thunk';
import { ActionType } from './actions/cellsAction';

// all our reducers
import { reducers } from './reducers';

// declare initial Global state object
const initialState = {};

// redux thunk middleware
const middleware = [thunk];

// STORE is the collections of different Reducers to create global state object.
export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Typescript might think 'state' could be undefined
// To prevent this, add 'return state' in switch cases
// const state = store.getState();

// Manual dispatching of Actions for Testing of a Redux Store
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code',
  },
});

store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text',
  },
});

// console.log(store.getState());
