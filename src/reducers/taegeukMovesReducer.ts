const initialState = {
  taegeukData: [],
};

// Define the reducer function
const taegeukMovesReducer = (state = initialState, action) => {
  console.log('action', action);
  return state;
};

export default taegeukMovesReducer;
