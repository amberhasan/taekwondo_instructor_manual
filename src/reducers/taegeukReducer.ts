import {ActionType} from '../types';
import {Action, TaegeukState} from '../types';

const initialState: TaegeukState = {
  taegeukData: [],
  loading: true,
};
// Define the reducer function
const taegeukReducer = (state = initialState, action: Action) => {
  // console.log('action', action);
  if (action.type === ActionType.SET_TAEGEUK_DATA) {
    state = {
      ...state,
      taegeukData: action.payload, // update state
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

export default taegeukReducer;
