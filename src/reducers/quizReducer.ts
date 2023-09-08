// Define the initial state for the example reducer
const initialState = {
  counter: 0,
};

// Define the reducer function
const quizReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case INCREMENT:
  //       return {
  //         ...state,
  //         counter: state.counter + 1,
  //       };
  //     case DECREMENT:
  //       return {
  //         ...state,
  //         counter: state.counter - 1,
  //       };
  //     default:
  //       return state;
  //   }
  return initialState;
};

export default quizReducer;
