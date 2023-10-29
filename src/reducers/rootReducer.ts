import {combineReducers} from 'redux';
import taegeukReducer from './taegeukReducer';
import palgwaeReducer from './palgwaeReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  taegeuk: taegeukReducer,
  palgwae: palgwaeReducer,
  // Add more reducers here if needed
});

export default rootReducer;
