/**
 *
 * Questions
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from 'react-weui';
import messages from './messages';
import QuestionCard from '../QuestionCard';

import styles from './styles.css';

function Questions({ data = [], ...questionProps }) {
  let questionCards = data.map((item, index) => (
    <div className={styles.questionCard} key={index}>
      <QuestionCard
        data={item}
        url={getUrl(item, questionProps)}
        {...questionProps}
      />
    </div>
  ));
  if (data.length === 0) {
    questionCards = getNoQuestion();
  }
  return <div className={styles.questions}>{questionCards}</div>;
}

function getNoQuestion() {
  return (
    <div className={styles.noQuestion}>
      <div>
        <Icon size="large" value="warn" primary />
      </div>
      <FormattedMessage {...messages.noquestion} />
    </div>
  );
}

const getRoutByTeacher = type => (type === 8 ? 'paper_wrong' : 'wrong_list');
const getRoutByStudent = type =>
  type === 8 ? 'answer_paper' : 'answer_question';

function getUrl(item, props) {
  const { id, type } = item;
  const { openid, courseid } = props;
  const typeUrl = props.showDetail
    ? getRoutByTeacher(type)
    : getRoutByStudent(type);
  const query = `?openid=${openid}&question_id=${id}&course_id=${courseid}`;

  return props.showDetail
    ? `v1/wquestion/${typeUrl}${query}`
    : `v1/student/${typeUrl}${query}`;
}

Questions.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  questionProps: PropTypes.object
};

export default Questions;
