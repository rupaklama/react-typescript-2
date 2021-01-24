import { ActionType } from '../action-types';

// actions
interface SearchAction {
  // In order for some object to satisfy this interface,
  // it must have type property that is exactly equal to the string === 'search_repositories'
  type: ActionType.SEARCH_REPOSITORIES;
}

interface SearchSuccessAction {
  type: ActionType.SEARCH_REPOSITORIES_SUCCESS;
  payload: string[];
}

interface SearchErrorAction {
  type: ActionType.SEARCH_REPOSITORIES_ERROR;
  payload: string;
}

// NOTE: 'Type union' can be very long, we can use 'Type Alias' if we want instead.
// 'Type Alias' is just a name that represents another Type, similar to variable but for type.
// 'Type Alias' is to create New Name for another Type.
export type Action = SearchAction | SearchSuccessAction | SearchErrorAction;
