export interface Move {
  id: number;
  kiyap: boolean;
  moveDescription: string;
  stance: string;
  video: string;
}

export interface Quiz {
  correctAnswerIndex: number;
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

export interface PalgwaeState {
  palgwaeData: [] | [Form];
  loading: boolean;
}

export interface Action {
  type: ActionType;
  payload?: any;
}

export enum ActionType {
  SET_TAEGEUK_DATA,
  SET_PALGWAE_DATA,
  SET_LOADING,
}

export interface FormItem {
  item: Form;
  index: number;
}

export interface CardItem {
  item: Form;
  index: number;
  handleRowPress: (index: number) => void;
}

// export interface ReduxState {
//   taegeuk: TaegeukState;
//   palgwae: PalgwaeState;
// }
