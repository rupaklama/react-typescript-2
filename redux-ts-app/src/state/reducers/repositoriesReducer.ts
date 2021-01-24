import { ActionType } from '../action-types';
import { Action } from '../actions';

// state
export interface RepositoriesState {
  loading: boolean;

  // If we have an error, set error message to error or
  // if no error, set error to null to indicate that there's no error
  error: string | null;

  data: string[];
}

// initial state for this reducer
const initialState = {
  loading: false,
  error: null,
  data: []
}


// NOTE: Adding 'return type annotation' to our reducer function to always
// return a Value of Type - RepositoriesState from this function to avoid state errors.
export const repositoriesReducer = (
  state: RepositoriesState = initialState,
  action: Action // NOTE: Type union can be very long here, created Type Alias - Action
): RepositoriesState => {
  // A type guard is some expression that performs a runtime check that guarantees the type in some scope.
  // Type guard is to narrow down an Action or to be more specific with a conditional block
  // This will help Typescript to figure out what kind of Action it really is.
  /** if (action.type === 'search_repositories_success') {
    // Now, we know with 100% certainty that 'action' satisfies the 'SearchSuccessAction' interface
    // because of that now we know for sure that payload property is an array of strings. 
  } */

  // NOTE: Switch statement works as a Type Guard in typescript as well.
  // Just like above with if block.
  // We know with 100% certainty that all the 'action' satisfies the above interfaces
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORIES:
      return { loading: true, error: null, data: [] };
    case ActionType.SEARCH_REPOSITORIES_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionType.SEARCH_REPOSITORIES_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};


