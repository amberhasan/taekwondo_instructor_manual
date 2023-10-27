const initialState = {
  taegeukData: [],
};

// Define the reducer function
const taegeukMovesReducer = (state = initialState, action) => {
  console.log('action', action);
  if (action.type === 'SET_TAEGEUK_DATA') {
    // update state
    return {
      taegeukData: action.payload,
    };
  }
  return state;
};

export default taegeukMovesReducer;
