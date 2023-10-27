const initialState = {
  palgwaeData: [],
};

const palgwaeMovesReducer = (state = initialState, action) => {
  if (action.type == 'SET_PALGWAE_DATA') {
    state = {
      palgwaeData: action.payload, //new state
    };
  }
  return state;
};

export default palgwaeMovesReducer;
