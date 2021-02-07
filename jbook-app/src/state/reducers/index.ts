import { combineReducers } from 'redux';
import { cellsReducer } from './cellsReducer';

export const reducers = combineReducers({
  cells: cellsReducer,
});

// This is saying we are creating some reducers above,
// telling 'Typescript' to take all those Reducers functions & give us back the
// 'TYPE' of whatever the function returns. We are going to assign that TYPE to RootState - type alias
export type RootState = ReturnType<typeof reducers>;
