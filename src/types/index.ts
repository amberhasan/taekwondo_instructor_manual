export interface Move {
  id: number;
  kiyap: boolean;
  moveDescription: string;
  stance: string;
  video: string;
}

export interface Quiz {
  correctAnswerindex: number;
  options: [string];
  question: string;
}

export interface Form {
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

export interface TaegeukState {
  taegeukData: [] | [Form];
  loading: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}
