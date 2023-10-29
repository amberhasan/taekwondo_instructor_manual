import {combineReducers} from 'redux';
import taegeukMovesReducer from './taegeukMovesReducer';
import palgwaeMovesReducer from './palgwaeMovesReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  taegeukMoves: taegeukMovesReducer,
  palgwaeMoves: palgwaeMovesReducer,
  // Add more reducers here if needed
});

export default rootReducer;
