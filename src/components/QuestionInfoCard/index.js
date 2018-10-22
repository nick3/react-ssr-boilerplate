/**
 *
 * QuestionInfoCard
 *
 */

import React, { PropTypes, PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { questionAssets, quizAssets } from '../../utils/constants';
import styles from './styles.css';
import classNames from 'classnames';
import { isEmpty, isUndefined } from 'lodash';
import moment from 'moment';

class QuestionInfoCard extends PureComponent {
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

  getTimeText() {
    const { isPaper, type, onTime } = this.props;
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
      text = isPaper ? (
        <FormattedMessage
          {...messages[type === 0 ? 'qLimit' : 'tLimit']}
          values={{ limit: time }}
        />
      ) : (
        <FormattedMessage {...messages.limit} values={{ limit: time }} />
      );
    }
    if (onTime && limit <= 0) {
      text = (
        <span className={styles.answerEnd}>
          <FormattedMessage {...messages.answerEnd} />
        </span>
      );
    }
    if (!onTime) {
      text = <FormattedMessage {...messages.answering} />;
    }
    return text;
  }

  getNotEndText(limit) {
    const { answered, onTime } = this.props;
    let text = 'answer';
    if (!answered) {
      if (onTime) {
        text = limit > 0 ? 'notAnswer' : 'timeout';
      } else {
        text = 'notAnswer';
      }
    }
    return text;
  }

  render() {
    const {
      id,
      type,
      code,
      image,
      content,
      isPaper,
      count,
      answered,
      myAnswer,
      isAnswerOpen,
      isCorrect,
      onTime,
      isAnswerEnd,
      toAnswerPage,
      toPaperPage,
      answerCount,
      noAnswerCount,
      answerRatio
    } = this.props;
    const { limit } = this.state;
    const assets = isPaper ? quizAssets[type + 1] : questionAssets[type];
    const { text, color } = assets;
    const hasImg = !isEmpty(image);
    const num = count || '0';
    const showRightWrongBtn = myAnswer && isAnswerOpen;
    const timeText = this.getTimeText();
    const func = isPaper ? toPaperPage : toAnswerPage;

    return (
      <div className={styles.questionInfoCard} key={`questionInfoCard_${id}`}>
        <div
          className={classNames(styles.numBox, {
            [styles.numBoxForPaper]: isPaper
          })}
          style={{ backgroundColor: color }}
        >
          {`${code} ${text}`}
          {isPaper && (
            <FormattedMessage {...messages.questionCount} values={{ num }} />
          )}
        </div>
        <div className={styles.infoBox}>
          <button
            className={styles.btnCover}
            onClick={() => {
              func(id);
            }}
          />
          <div className={styles.titleBox}>
            <div
              className={classNames(styles.content, {
                [styles.hasImg]: hasImg
              })}
            >
              {content}
            </div>
            {hasImg && <img alt="" className={styles.img} src={image} />}
          </div>
          {!isAnswerEnd && <span className={styles.limit}>{timeText}</span>}
          <div className={styles.line} />
          <span className={styles.answer}>
            {isAnswerEnd ? (
              <FormattedMessage
                {...messages[answered ? 'answer' : 'timeout']}
              />
            ) : (
              <FormattedMessage {...messages[this.getNotEndText(limit)]} />
            )}
          </span>
          {(isAnswerEnd ? myAnswer || !isUndefined(answerRatio) : true) && (
            <div className={styles.myAnswer}>
              {!isPaper ? (
                myAnswer
              ) : (
                <span>
                  <span className={styles[answered ? 'finish' : 'not']}>
                    <FormattedMessage
                      {...messages[answered ? 'finish' : 'not']}
                    />
                  </span>
                  <FormattedMessage
                    values={{
                      answerCount,
                      noAnswerCount: noAnswerCount || '0',
                      ratio: answerRatio === 0 ? '0%' : answerRatio
                    }}
                    {...messages.pageAnswer}
                  />
                </span>
              )}
            </div>
          )}
          {!showRightWrongBtn &&
            !isAnswerEnd && (
              <button
                className={classNames(
                  styles[isPaper ? 'paperBtn' : 'answerBtn'],
                  {
                    [styles.canNotEditColor]:
                      isAnswerEnd ||
                      !isEmpty(myAnswer) ||
                      (onTime && limit <= 0)
                  },
                  { [styles.answerEndBtn]: isAnswerEnd }
                )}
                onClick={() => {
                  if (isAnswerEnd || !isEmpty(myAnswer)) {
                    return;
                  }
                  if (!onTime || limit > 0) {
                    func(id);
                  }
                }}
              >
                <i className={styles[isPaper ? 'paperIcon' : 'answerIcon']} />
              </button>
            )}
          {(type === 5 ? myAnswer : showRightWrongBtn) && (
            <i
              className={classNames(
                styles.rightWrongIcon,
                { [styles.answerEndIcon]: isAnswerEnd },
                styles[isCorrect || type === 5 ? 'rightIcon' : 'wrongIcon']
              )}
            />
          )}
        </div>
      </div>
    );
  }
}

QuestionInfoCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.number,
  code: PropTypes.string,
  image: PropTypes.string,
  count: PropTypes.number,
  onTime: PropTypes.bool,
  isPaper: PropTypes.bool,
  answered: PropTypes.bool,
  content: PropTypes.string,
  endTime: PropTypes.number,
  isCorrect: PropTypes.bool,
  myAnswer: PropTypes.string,
  isAnswerEnd: PropTypes.bool,
  isAnswerOpen: PropTypes.bool,
  toAnswerPage: PropTypes.func,
  toPaperPage: PropTypes.func,
  answerCount: PropTypes.number,
  noAnswerCount: PropTypes.number,
  answerRatio: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default QuestionInfoCard;
