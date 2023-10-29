import {SET_PALGWAE_DATA} from '../actions';

const initialState = {
  palgwaeData: [],
};

const palgwaeReducer = (state = initialState, action) => {
  if (action.type == SET_PALGWAE_DATA) {
    state = {
      palgwaeData: action.payload, //new state
    };
  }
  return state;
};

export default palgwaeReducer;
