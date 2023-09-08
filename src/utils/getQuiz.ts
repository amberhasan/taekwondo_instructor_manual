import palgwaeQuizSet from '../data/palgwaeQuizSet';
import taegeukQuizSet from '../data/taegeukQuizSet';

const getQuiz = (selectedFormIndex, formType) => {
  if (formType === 'taegeuk') {
    switch (selectedFormIndex) {
      case 0:
        return taegeukQuizSet[selectedFormIndex].taegeuk1;
      case 1:
        return taegeukQuizSet[selectedFormIndex].taegeuk2;
      case 2:
        return taegeukQuizSet[selectedFormIndex].taegeuk3;
      case 3:
        return taegeukQuizSet[selectedFormIndex].taegeuk4;
      case 4:
        return taegeukQuizSet[selectedFormIndex].taegeuk5;
      case 5:
        return taegeukQuizSet[selectedFormIndex].taegeuk6;
      case 6:
        return taegeukQuizSet[selectedFormIndex].taegeuk7;
      case 7:
        return taegeukQuizSet[selectedFormIndex].taegeuk8;
    }
  }
  //   let quiz =
  //     formType === 'taegeuk'
  //       ? taegeukQuizSet[selectedFormIndex].taegeuk2
  //       : palgwaeQuizSet[selectedFormIndex];

  //   return quiz;
};

export default getQuiz;
