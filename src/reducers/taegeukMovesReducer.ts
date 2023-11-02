import {SET_TAEGEUK_DATA, SET_LOADING} from '../actions';
import {TaegeukState, Action} from '../types';

const initialState: TaegeukState = {
  taegeukData: [],
  loading: true,
};

// Define the reducer function
const taegeukReducer = (state = initialState, action: Action) => {
  // console.log('action', action);
  if (action.type === SET_TAEGEUK_DATA) {
    state = {
      ...state,
      taegeukData: action.payload, // update state
    };
  }
  if (action.type === SET_LOADING) {
    state = {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};

export default taegeukReducer;
