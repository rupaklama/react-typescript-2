import axios from 'axios';
import { ActionType } from '../action-types';
import { Action } from '../actions';

// Inside of Redux Type Definition file, there’s actually an Interface for it to define what the Dispatch function is.
// We don’t have to create Custom Interface ourself, instead we are going to IMPORT interface 'Dispatch' from there
// to use it to Annotate Dispatch in Action Creators.
import { Dispatch } from 'redux';


// we need to provide Type Annotation for 'dispatch'
// default Dispatch Annotation with our 'Action' to return only our define Action types - correct ones
export const fetchRepositories = (term: string) => async (dispatch: Dispatch<Action>) => {
  // dispatching action
  dispatch({
    type: ActionType.SEARCH_REPOSITORIES,
  });

  try {
    const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
      params: {
        text: term,
      },
    });

    const names = data.objects.map((object: any) => {
      return object.package.name;
    });

    // dispatching action
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
      payload: names,
    });
  } catch (err) {
    dispatch({
      type: ActionType.SEARCH_REPOSITORIES_ERROR,
      // error object's message property
      payload: err.message,
    });
  }
};
