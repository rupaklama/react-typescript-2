import { ActionType, Action } from '../actions/cellsAction';
import { Cell } from '../cell';

// interface reducer state
interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    // keys - ids of individual cell & values - cells themselves
    [key: string]: Cell;
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
export const cellsReducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      return state;
    case ActionType.DELETE_CELL:
      return state;
    case ActionType.MOVE_CELL:
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      return state;
    default:
      return state;
  }
};
