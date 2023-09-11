import {combineReducers} from 'redux';
import quizReducer from './quizReducer';
import taegeukMovesReducer from './taegeukMovesReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  quiz: quizReducer, // Replace 'example' with your reducer key
  taegeukMoves: taegeukMovesReducer,
  // Add more reducers here if needed
});

export default rootReducer;
