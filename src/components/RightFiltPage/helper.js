import { courseResourceType, questionState } from '../../utils/constants';
import { Labels } from '../../schemas';
import { normalize, arrayOf } from 'normalizr';
import _ from 'lodash';

export function resourceTypeFilter(question, resourceTypeSelected) {
  let isResourceTypeSelected = false;
  if (resourceTypeSelected.length !== 0) {
    const isQuiz = question.isQuiz;
    _.map(resourceTypeSelected, resType => {
      switch (resType) {
        case courseResourceType.question:
          if (!isQuiz) {
            isResourceTypeSelected = true;
            return false;
          }
          break;
        case courseResourceType.quiz:
          if (isQuiz) {
            isResourceTypeSelected = true;
            return false;
          }
          break;
        default:
          break;
      }

      return true;
    });
  } else {
    isResourceTypeSelected = true;
  }

  return isResourceTypeSelected;
}

export function stateFilter(question, questionStateSelected) {
  let isQuestionStateSelected = false;
  if (
    questionStateSelected.length !== 0 &&
    questionStateSelected.length !== 2
  ) {
    const history = question.history;
    if (questionStateSelected.indexOf(questionState.open) !== -1) {
      if (history.length !== 0 && history[history.length - 1].status === true) {
        isQuestionStateSelected = true;
      }
    } else if (
      history.length === 0 ||
      history[history.length - 1].status === false
    ) {
      isQuestionStateSelected = true;
    }
  } else {
    isQuestionStateSelected = true;
  }

  return isQuestionStateSelected;
}

export function labelsFilter(labels, labelsSelected) {
  let isLabelsSelected = false;
  if (labelsSelected.length !== 0) {
    if (labels.length !== 0) {
      const labelsRes = normalize(labels, arrayOf(Labels));
      const questionLabelsIds = labelsRes.result;
      isLabelsSelected = true;
      _.map(labelsSelected, label => {
        if (questionLabelsIds.indexOf(label) === -1) {
          isLabelsSelected = false;
          return false;
        }

        return true;
      });
    } else {
      isLabelsSelected = false;
    }
  } else {
    isLabelsSelected = true;
  }

  return isLabelsSelected;
}
