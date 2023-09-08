import palgwaeQuizSet from '../data/palgwaeQuizSet';
import taegeukQuizSet from '../data/taegeukQuizSet';

const getQuiz = (selectedFormIndex, formType) => {
  if (formType === 'taegeuk') {
    switch (selectedFormIndex) {
      case 0:
        return taegeukQuizSet[selectedFormIndex].taegeuk1;
      case 1:
        return taegeukQuizSet[selectedFormIndex].taegeuk2;
      // case 2:
      // return taegeukQuizSet[selectedFormIndex].taegeuk3
      // case 3:
      // return taegeukQuizSet[selectedFormIndex].taegeuk4
      // case 4:
    }
  }
  //   let quiz =
  //     formType === 'taegeuk'
  //       ? taegeukQuizSet[selectedFormIndex].taegeuk2
  //       : palgwaeQuizSet[selectedFormIndex];

  //   return quiz;
};

export default getQuiz;
