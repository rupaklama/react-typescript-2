// 'produce' function helps to mutate state directly in redux to directly update our state
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { ActionType, Action } from '../actions/cellsAction';
import { Cell } from '../cell';

// interface reducer state
interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    // storing data in object - {} with key/value pair
    // keys - ids of individual cell & value will be cell object
    [key: string]: Cell;
    // this can be inside of big array like Cell[]
    // it gets lot easier if we store in object like above
    // data : {
    //   '1234': { id: '1234', type: 'code', content: 'const a = 1;'}, // cell 1
    //   '5678': { id: '5678', type: 'code', content: 'documentation...'}, // cell 2
    // }
  };
}

// reducer initial state
const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

// reducer
// wrapping entire reducer function with 'producer' so that we can mutate state directly &
// don't have to create traditional way of brand new object with '...' spread operator
export const cellsReducer = produce(
  (state: CellsState = initialState, action: Action) => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload;

        // In redux store's state,
        // data property of 'cells' object reducer - find specific cell with 'id' inside of data object &
        // access the 'content' property of that object & update it with our current payload's content
        state.data[id].content = content;
        // to exit, same as break
        return state;

      case ActionType.DELETE_CELL:
        // We are using same id in 'order array & data object' property
        // deleting in data object
        delete state.data[action.payload];

        // deleting in order array
        // returning false on id we don't want to keep - to remove false value in an array
        state.order = state.order.filter(id => id !== action.payload);
        return state;

      case ActionType.MOVE_CELL:
        const { direction } = action.payload;

        // to find index of an element or id in our 'order' array
        const index = state.order.findIndex(id => id === action.payload.id); // true

        // to figure out new index of above element
        const targetIndex = direction === 'up' ? index - 1 : index + 1; // left or right

        // to make sure an index is always inside of an array
        // edge case - unusual situation
        // before or end of an array
        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        // swapping logic - swapping indexes
        state.order[index] = state.order[targetIndex];
        // also assigning an 'id' from the payload to the index
        state.order[targetIndex] = action.payload.id;

        return state;

      case ActionType.INSERT_CELL_AFTER:
        // to create a new cell to add before current cell or at the end
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4(),
        };

        // adding new cell into our Data object & Order array as well
        state.data[cell.id] = cell; // new cell object with new id

        // inserting new above Cell into our Order array
        const foundIndex = state.order.findIndex(
          id => id === action.payload.id
        );

        // edge case
        // if less than 0 results in an error (-1)
        if (foundIndex < 0) {
          // to add to the start        of array
          state.order.unshift(cell.id);
        } else {
          // to add new cell before current cell
          state.order.splice(foundIndex + 1, 0, cell.id);
          // The splice() method changes the contents of an array by removing or replacing existing elements
          // and/or adding new elements in place.
        }
        return state;
      default:
        return state;
    }
  }
);

// const randomId = () => {
//   return Math.random().toString(36).substr(2, 5);
// };
