import {combineReducers} from 'redux';
import quizReducer from './quizReducer';
import taegeukMovesReducer from './taegeukMovesReducer';
import palgwaeMovesReducer from './palgwaeMovesReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  quiz: quizReducer,
  taegeukMoves: taegeukMovesReducer,
  palgwaeMoves: palgwaeMovesReducer,
  // Add more reducers here if needed
});

export default rootReducer;
