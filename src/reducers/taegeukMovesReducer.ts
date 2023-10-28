import {SET_TAEGEUK_DATA, SET_LOADING} from '../actions';

const initialState = {
  taegeukData: [],
  loading: true,
  quiz: [],
};

// Define the reducer function
const taegeukMovesReducer = (state = initialState, action) => {
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

export default taegeukMovesReducer;
