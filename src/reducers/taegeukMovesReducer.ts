const initialState = {
  taegeukData: [],
  loading: true,
  quiz: [],
};

// Define the reducer function
const taegeukMovesReducer = (state = initialState, action) => {
  // console.log('action', action);
  if (action.type === 'SET_TAEGEUK_DATA') {
    state = {
      ...state,
      taegeukData: action.payload, // update state
    };
  }
  if (action.type === 'SET_LOADING_HIDE') {
    state = {
      ...state,
      loading: false,
    };
  }
  return state;
};

export default taegeukMovesReducer;
