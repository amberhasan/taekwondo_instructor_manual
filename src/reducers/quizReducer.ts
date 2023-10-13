import palgwaeQuizSet from '../data/palgwaeQuizSet';
import taegeukQuizSet from '../data/taegeukQuizSet';

interface State {
  taegeuk: string[];
  palgwae: string[];
}

const initialState = {
  taegeuk: taegeukQuizSet,
  palgwae: palgwaeQuizSet,
};

// Define the reducer function
const quizReducer = (state = initialState, action) => {
  return state;
};

export default quizReducer;
