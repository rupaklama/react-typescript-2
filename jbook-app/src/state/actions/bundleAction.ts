// Inside of Redux Type Definition file, there’s actually an Interface for it to define what the Dispatch function is.
// We don’t have to create Custom Interface ourself, instead we are going to IMPORT interface 'Dispatch' from there
// to use it to Annotate Dispatch in Action Creators.
import { Dispatch } from 'redux';
import bundle from '../../bundler';

import { ActionType } from './actionTypes';

// Actions interface
export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

// type alias
export type BundlesAction = BundleStartAction | BundleCompleteAction;

// action creators
export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<BundlesAction>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });
    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: {
          code: result.code,
          err: result.err,
        },
      },
    });
  };
};
