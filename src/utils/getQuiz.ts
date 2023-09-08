import palgwaeQuizSet from '../data/palgwaeQuizSet';
import taegeukQuizSet from '../data/taegeukQuizSet';

const getQuiz = (selectedFormIndex, formType) => {
  if (formType === 'taegeuk') {
    return taegeukQuizSet[selectedFormIndex];
  } else {
    switch (selectedFormIndex) {
      case 0:
        return palgwaeQuizSet[selectedFormIndex].palgwae1;
      case 1:
        return palgwaeQuizSet[selectedFormIndex].palgwae2;
      case 2:
        return palgwaeQuizSet[selectedFormIndex].palgwae3;
      case 3:
        return palgwaeQuizSet[selectedFormIndex].palgwae4;
      case 4:
        return palgwaeQuizSet[selectedFormIndex].palgwae5;
      case 5:
        return palgwaeQuizSet[selectedFormIndex].palgwae6;
      case 6:
        return palgwaeQuizSet[selectedFormIndex].palgwae7;
      case 7:
        return palgwaeQuizSet[selectedFormIndex].palgwae8;
    }
  }
};

export default getQuiz;
