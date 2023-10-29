import {SET_TAEGEUK_DATA, SET_LOADING} from '../actions';

interface Move {
  id: number;
  kiyap: boolean;
  moveDescription: string;
  stance: string;
  video: string;
}

interface Quiz {
  correctAnswerindex: number;
  options: [string];
  question: string;
}

interface Form {
  description: string;
  facts: [string];
  fullVideo: string;
  id: number;
  image: string;
  moves: [Move];
  quiz: [Quiz];
  title: string;
  titleKorean: string;
}

interface TaegeukState {
  taegeukData: [Form];
  loading: boolean;
}

const initialState = {
  taegeukData: [],
  loading: true,
};

// Define the reducer function
const taegeukReducer = (state = initialState, action) => {
  // console.log('action', action);
  if (action.type === SET_TAEGEUK_DATA) {
    state = {
      ...state,
      taegeukData: action.payload, // update state
    };
  }
  if (action.type === SET_LOADING) {
    state = {
      ...state,
      loading: action.payload,
    };
  }
  return state;
};

export default taegeukReducer;
