/*
 * QuestionInfoCard Messages
 *
 * This contains all the text for the QuestionInfoCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  questionCount: {
    id: 'app.components.QuestionInfoCard.questionCount',
    defaultMessage: '共{num}题'
  },
  answer: {
    id: 'app.components.QuestionInfoCard.answer',
    defaultMessage: '你的答案'
  },
  notAnswer: {
    id: 'app.components.QuestionInfoCard.notAnswer',
    defaultMessage: '暂未作答'
  },
  answerEnd: {
    id: 'app.components.QuestionInfoCard.answerEnd',
    defaultMessage: '答题已结束'
  },
  noLimit: {
    id: 'app.components.QuestionInfoCard.noLimit',
    defaultMessage: '本题不限时'
  },
  limit: {
    id: 'app.components.QuestionInfoCard.limit',
    defaultMessage: '答题时间还剩 {limit}'
  },
  answering: {
    id: 'app.components.QuestionInfoCard.answering',
    defaultMessage: '答题进行中'
  },
  qLimit: {
    id: 'app.components.QuestionInfoCard.qLimit',
    defaultMessage: '离关闭还有 {limit}'
  },
  tLimit: {
    id: 'app.components.QuestionInfoCard.tLimit',
    defaultMessage: '离交卷还有 {limit}'
  },
  timeout: {
    id: 'app.components.QuestionInfoCard.timeout',
    defaultMessage: '没有在规定时间内提交答案'
  },
  pageAnswer: {
    id: 'app.components.QuestionInfoCard.pageAnswer',
    defaultMessage: '已答{answerCount}题 ({ratio})，{noAnswerCount}题未答'
  },
  finish: {
    id: 'app.components.QuestionInfoCard.finish',
    defaultMessage: '已交卷'
  },
  not: {
    id: 'app.components.QuestionInfoCard.not',
    defaultMessage: '未交卷'
  }
});
