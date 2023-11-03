import {Action, ActionType} from '../types';

const initialState = {
  palgwaeData: [],
};

const palgwaeReducer = (state = initialState, action: Action) => {
  if (action.type == ActionType.SET_PALGWAE_DATA) {
    state = {
      palgwaeData: action.payload, //new state
    };
  }
  return state;
};

export default palgwaeReducer;
