import {combineReducers} from 'redux';
import quizReducer from './quizReducer';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  quiz: quizReducer, // Replace 'example' with your reducer key
  // Add more reducers here if needed
});

export default rootReducer;
