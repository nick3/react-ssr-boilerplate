/**
 *
 * QuestionCard
 *
 */

import React, { PropTypes } from 'react';
import { indexOf } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { Button } from 'react-weui';
import messages from './messages';
import config from 'config';
import {
  getLevel,
  questionAssets,
  getQuestionTypeNumber
} from '../../utils/constants';
import styles from './styles.css';

function QuestionCard({ data, onChangeStatus, url, showDetail = true }) {
  const {
    id,
    status,
    type,
    correctAnswerRatio,
    content,
    answerCount,
    isAnswered = 0
  } = data;
  const chageStatus = (state, qid) => e => {
    e.preventDefault();
    onChangeStatus(!state, qid);
  };
  const questionBotton = getQuestionBtn(status, id, chageStatus);
  const correctRatio = getCrrectRatio(type, correctAnswerRatio);
  const questionCont = handleQuestionContent(content);
  const contentText = questionCont.text;
  const constentImage = questionCont.image;
  const level = getLevel(data.difficult_level);
  const { color: backgroundColor } = questionAssets[
    getQuestionTypeNumber(type)
  ];
  const isPaper = getQuestionTypeNumber(type) === 8;

  return (
    <div className={styles.questionCard}>
      <a href={`${config.domain}${url}`}>
        <div className={styles.contentWrap}>
          <div className={styles.contentArea}>
            <div className={styles.title}>
              <div className={styles.serial} style={{ backgroundColor }}>
                {`${data.serialNumber} ${config.questionType[type]}`}
              </div>
              {level}
              <span className={styles.pullRight}>
                {isAnswered ? <FormattedMessage {...messages.answered} /> : ''}
              </span>
            </div>
            <div className={styles.content}>
              <div className={styles.contentText}>{contentText}</div>
              {constentImage ? (
                <img className={styles.imgArea} src={constentImage} alt="" />
              ) : null}
            </div>
          </div>
        </div>
        {showDetail ? (
          <div className={styles.footer}>
            <div>
              <span className={styles.mRight10}>
                <i className={styles.iconPerson} />
                {answerCount}
                <FormattedMessage {...messages.answerNum} />({data.answerRatio}
                %)
              </span>
              {isPaper || correctRatio}
            </div>
            {questionBotton}
          </div>
        ) : null}
      </a>
    </div>
  );
}

function getCrrectRatio(type, correctAnswerRatio) {
  return indexOf(config.correctQuetionTypes, type) > -1 ? (
    <span>
      <i className={styles.iconCorrect} />
      {correctAnswerRatio}%<FormattedMessage {...messages.correctRatio} />
    </span>
  ) : null;
}

function getQuestionBtn(status, id, chageStatus) {
  return status ? (
    <Button
      size="small"
      type="default"
      onClick={chageStatus(status, id)}
      className={styles.miniBtn}
    >
      <FormattedMessage {...messages.close} />
    </Button>
  ) : (
    <Button
      size="small"
      className={styles.miniBtn}
      onClick={chageStatus(status, id)}
    >
      <FormattedMessage {...messages.open} />
    </Button>
  );
}

function handleQuestionContent(content) {
  const dom = document.createElement('div');
  dom.innerHTML = content;

  const image = dom.querySelector('img') && dom.querySelector('img').src;
  const textNodes = getTextNode(dom.childNodes);
  return {
    text: textNodes,
    image
  };
}

function getTextNode(node) {
  let strText = '';
  for (let i = 0, len = node.length; i < len; i += 1) {
    strText +=
      node[i].nodeType !== 1
        ? node[i].nodeValue
        : getTextNode(node[i].childNodes);
  }

  return strText;
}

QuestionCard.propTypes = {
  data: PropTypes.object,
  onChangeStatus: PropTypes.func,
  url: PropTypes.string,
  showDetail: PropTypes.bool
};

export default QuestionCard;
