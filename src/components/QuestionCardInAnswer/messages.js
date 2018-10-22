/*
 * QuestionCardInAnswer Messages
 *
 * This contains all the text for the QuestionCardInAnswer component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  start: {
    id: 'app.components.QuestionCardInAnswer.start',
    defaultMessage: '开始作答'
  },
  noLimit: {
    id: 'app.components.QuestionCardInAnswer.noLimit',
    defaultMessage: '本题不限时'
  },
  limit: {
    id: 'app.components.QuestionCardInAnswer.limit',
    defaultMessage: '答题时间还剩 {time}'
  },
  end: {
    id: 'app.components.QuestionCardInAnswer.end',
    defaultMessage: '答题已结束'
  }
});
