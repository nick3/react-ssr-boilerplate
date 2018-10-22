/**
 *
 * QuestionCardInAnswer
 *
 */

import React, { PropTypes, PureComponent } from 'react';
import { questionAssets, quizAssets } from '../../utils/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import moment from 'moment';
import styles from './styles.css';

export class QuestionCardInAnswer extends PureComponent {
  state = {
    limit: null
  };

  componentWillMount() {
    const { endTime } = this.props;
    if (endTime) {
      this.setupTimeout(endTime);
    }
  }

  componentWillReceiveProps(next) {
    const { endTime } = next;
    const { endTime: oldEndTime } = this.props;
    if (endTime && !oldEndTime) {
      this.setupTimeout(endTime);
    }
    if (oldEndTime && endTime && oldEndTime !== endTime) {
      this.setupTimeout(endTime);
    }
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
  }

  setupTimeout(endTime) {
    const { limit } = this.state;
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.timeout = setInterval(() => {
      let tmp = 0;
      if (limit) {
        tmp = limit;
      } else {
        tmp = moment(endTime).diff(moment(), 'seconds');
      }
      if (tmp - 1 < 0) {
        clearInterval(this.timeout);
      } else {
        this.setState({ limit: tmp - 1 });
      }
    }, 1000);
  }

  getLimitContent() {
    const { limit } = this.state;
    let text;
    if (limit > 0) {
      const hour = Math.floor(limit / 3600);
      const minute = Math.floor((limit % 3600) / 60);
      const seconds = limit % 60;
      const minuteText = minute < 10 ? `0${minute}` : minute;
      const secondsText = seconds < 10 ? `0${seconds}` : seconds;
      const time =
        hour > 0
          ? `${hour}:${minuteText}:${secondsText}`
          : `${minuteText}:${secondsText}`;
      text = <FormattedMessage {...messages.limit} values={{ time }} />;
    } else {
      text = limit && (
        <span className={styles.answerEnd}>
          <FormattedMessage {...messages.end} />
        </span>
      );
    }
    return text;
  }

  render() {
    const {
      avatar,
      teacherName,
      type,
      code,
      queCode,
      courseName,
      content,
      endTime,
      isPaper,
      onTime,
      toAnswerQuestionPage,
      toPaperAnswerPage
    } = this.props;
    this.setupTimeout(endTime);
    const assets = !isPaper ? questionAssets[type] : quizAssets[type + 1];
    const { backgroundImage, content: typeName } = assets;
    const text = this.getLimitContent();
    return (
      <div className={styles.questionCardInAnswer}>
        <div className={styles.infoDiv} style={{ backgroundImage }}>
          <div className={styles.teacherInfo}>
            <img alt="" className={styles.avatar} src={avatar} />
            <div className={styles.teacherName}>{teacherName}</div>
          </div>
          <div className={styles.courseName}>{`${code} ${courseName}`}</div>
          <span>
            {queCode} {typeName}
          </span>
        </div>
        <div className={styles.title}>{content}</div>
        <div className={styles.btn}>
          <button
            className={styles.btnCover}
            onClick={() => {
              if (isPaper) {
                toPaperAnswerPage();
              } else {
                toAnswerQuestionPage();
              }
            }}
          />
          <FormattedMessage {...messages.start} />
        </div>
        <span className={styles.limit}>
          {onTime && endTime ? (
            text
          ) : (
            <FormattedMessage {...messages.noLimit} />
          )}
        </span>
      </div>
    );
  }
}

QuestionCardInAnswer.propTypes = {
  // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  code: PropTypes.string,
  queCode: PropTypes.string,
  type: PropTypes.number,
  onTime: PropTypes.bool,
  // count: PropTypes.number,
  isPaper: PropTypes.bool,
  // cover: PropTypes.string,
  // answered: PropTypes.bool,
  avatar: PropTypes.string,
  content: PropTypes.string,
  endTime: PropTypes.number,
  courseName: PropTypes.string,
  // isAnswerOpen: PropTypes.bool,
  teacherName: PropTypes.string,
  toPaperAnswerPage: PropTypes.func,
  toAnswerQuestionPage: PropTypes.func
};

export default QuestionCardInAnswer;
