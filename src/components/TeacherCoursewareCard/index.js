/**
 *
 * CoursewareCard
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

const defaultImg = require('../../images/default_class.png');
const book = require('../../images/book.svg');
const style = {
  on: {
    color: '#fff',
    backgroundColor: '#1aae18',
    border: '1px solid #1aae18'
  },
  off: {
    color: '#666',
    backgroundColor: '#f8f8f8',
    border: '1px solid rgba(5, 5, 5, 0.1)'
  },
  control: {
    color: '#1aae18',
    backgroundColor: '#fff',
    border: '1px solid #1aae18'
  }
};

class CoursewareCard extends React.Component {
  // eslint-disable-line

  static propTypes = {
    courseware: PropTypes.object,
    courseCardOnTouch: PropTypes.func,
    setCoursewareStatus: PropTypes.func,
    // stopFunc: PropTypes.func,
    playFunc: PropTypes.func,
    showBtnZone: PropTypes.bool
  };

  setStatus = status => {
    const { setCoursewareStatus, courseware } = this.props;
    const data = {
      id: courseware.id,
      status
    };
    setCoursewareStatus(data);
  };

  render() {
    const {
      name,
      description,
      cover,
      accessCount,
      accessRatio /* converted, */,
      playStatus,
      status,
      id,
      fileType,
      serial_number: chapter,
      previewUrl
    } = this.props.courseware;
    const {
      courseCardOnTouch,
      /* stopFunc, */ playFunc,
      showBtnZone
    } = this.props;
    const chapterNmae = window.location.href.split('chapter=')[1];
    return (
      <div className={styles.coursewareCard}>
        <div className={styles.infoBox}>
          <div className={styles.contentBox}>
            {`${chapter || chapterNmae} ${name}`}
            <div>{description}</div>
          </div>
          <img alt="img" src={cover || defaultImg} className={styles.image} />
          <div className={styles.coursewareType}>{fileType}</div>
          {showBtnZone && (
            <button
              className={styles.cover}
              onClick={() => {
                window.location.href = previewUrl;
              }}
            />
          )}
        </div>
        {showBtnZone && (
          <div className={styles.btnBox}>
            <div className={styles.accessCountBox}>
              <img src={book} className={styles.bookIcon} alt="bookIcon" />
              <span>{accessCount || 0}</span>
              <span>
                <FormattedMessage {...messages.accessCount} />
              </span>
              <span>{`(${accessRatio || 0})`}</span>
            </div>
            <div className={styles.accessCountBox}>
              {playStatus &&
                (fileType === 'ppt' || fileType === 'pptx') && (
                  <button
                    className={styles.btn}
                    style={style.control}
                    onClick={() => {
                      courseCardOnTouch(id);
                    }}
                  >
                    <FormattedMessage {...messages.control} />
                  </button>
                )}
              {!playStatus && (
                <button
                  className={styles.btn}
                  style={style.on}
                  onClick={() => {
                    playFunc(id);
                  }}
                >
                  <FormattedMessage {...messages.projectionOn} />
                </button>
              )}
              {/* playStatus && <button
              className={styles.btn}
              style={style.off}
              onClick={() => { stopFunc(id); }}
            ><FormattedMessage {...messages.projectionOff} /></button> */}
              {!status && (
                <button
                  className={styles.btn}
                  style={style.on}
                  onClick={() => {
                    this.setStatus(true);
                  }}
                >
                  <FormattedMessage {...messages.on} />
                </button>
              )}
              {status && (
                <button
                  className={styles.btn}
                  style={style.off}
                  onClick={() => {
                    this.setStatus(false);
                  }}
                >
                  <FormattedMessage {...messages.off} />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CoursewareCard;
