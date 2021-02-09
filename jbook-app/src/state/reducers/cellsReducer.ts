// 'produce' function helps to mutate state directly in redux
// to directly update our state
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
        // deleting in data object
        delete state.data[action.payload];
        // deleting in order array
        state.order = state.order.filter(id => id !== action.payload);
        return state;
      case ActionType.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex(id => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1; // earlier or after

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state;
        }

        // swapping logic
        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id;

        return state;
      case ActionType.INSERT_CELL_BEFORE:
        const cell: Cell = {
          content: '',
          type: action.payload.type,
          id: uuidv4(),
        };

        state.data[cell.id] = cell;
        const foundIndex = state.order.findIndex(
          id => id === action.payload.id
        );

        if (foundIndex < 0) {
          state.order.push(cell.id);
        } else {
          state.order.splice(foundIndex, 0, cell.id);
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
