import { CellTypes } from '../cell';

// Enums for all action types
export enum ActionType {
  MOVE_CELL = 'MOVE_CELL',
  DELETE_CELL = 'DELETE_CELL',
  INSERT_CELL_BEFORE = 'INSERT_CELL_BEFORE',
  UPDATE_CELL = 'UPDATE_CELL',
}

// Actions interface
interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: 'up' | 'down';
  };
}

interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

interface InsertCellBeforeAction {
  type: ActionType.INSERT_CELL_BEFORE;
  payload: {
    id: string;
    type: CellTypes;
  };
}

interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

// NOTE: 'Type union' can be very long, we can use 'Type Alias' if we want instead.
// 'Type Alias' is just a name that represents another Type, similar to variable but for type.
// 'Type Alias' is to create New Name for another Type.
export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellBeforeAction
  | UpdateCellAction;

// action creators
export const updateCell = (): UpdateCellAction => {};

export const deleteCell = (): DeleteCellAction => {};

export const moveCell = (): MoveCellAction => {};

export const insertCellBefore = (): InsertCellBeforeAction => {};
