const initialState = {
  taegeukData: [],
};

// Define the reducer function
const taegeukMovesReducer = (state = initialState, action) => {
  // console.log('action', action);
  if (action.type === 'SET_TAEGEUK_DATA') {
    state = {
      taegeukData: action.payload, // update state
    };
  }
  return state;
};

export default taegeukMovesReducer;
