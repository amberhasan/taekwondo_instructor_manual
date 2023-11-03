import {Action, ActionType, PalgwaeState} from '../types';

const initialState: PalgwaeState = {
  palgwaeData: [],
  loading: true,
};

const palgwaeReducer = (state = initialState, action: Action) => {
  // console.log('action', action);
  if (action.type === ActionType.SET_PALGWAE_DATA) {
    state = {
      ...state,
      palgwaeData: action.payload, // update state
    };
  }
  if (action.type === ActionType.SET_LOADING) {
    state = {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};

export default palgwaeReducer;
