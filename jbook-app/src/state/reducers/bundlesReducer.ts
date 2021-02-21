import { BundlesAction } from './../actions/bundleAction';
import produce from 'immer';
import { ActionType } from '../actions/actionTypes';

// reducer state
interface BundlesState {
  // storing data in object - {} with key/value pair
  // Indexable types have an 'index signature' that describes the types we can use to index into the object,
  // along with the corresponding return types when indexing.
  [key: string]:
    | {
        loading: boolean; // to process bundling
        code: string;
        err: string;
      }
    | undefined;

  // Typescript and Javascript support indexing by 'Number' as in arrays and
  // by 'String' as in associative arrays or Object ({} ) instances
  // Only string and number are supported as types in in index signatures - indexes
}

// initial state
const initialState: BundlesState = {};

export const bundlesReducer = produce(
  (state: BundlesState = initialState, action: BundlesAction) => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        // look up this particular cell id
        // remove existing code or error for this particular cell to create a brand new bundle
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        };
        return state;
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.err,
        };
        return state;
      default:
        return state;
    }
  }
);
