/**
 *
 * CoursewareInfoCard
 *
 */

import React, { PropTypes } from 'react';
import { CoursewareAssets } from '../../utils/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import classNames from 'classnames';
import styles from './styles.css';
import { isEmpty } from 'lodash';
import Clipboard from 'react-clipboard.js';

function CoursewareInfoCard(props) {
  const {
    type,
    readed,
    cover,
    content,
    previewUrl,
    allowDownload,
    download,
    onDownload
  } = props;
  const backgroundImage = `url(${cover})`;
  const { text, backgroundImage: bg } = CoursewareAssets[type];
  return (
    <div className={styles.coursewareInfoCard}>
      <button
        className={styles.cover}
        onClick={() => {
          window.location.href = previewUrl;
        }}
      />
      <div className={styles.typeBg} />
      <div className={styles.imageBox} style={{ backgroundImage: bg }}>
        <div className={styles.type}>{text}</div>
        <div className={styles.image} style={{ backgroundImage }} />
      </div>
      <div className={styles.coursewareInfo}>
        <div className={styles.padding} />
        <div className={styles.contentBox}>
          <div className={styles.content}>{content}</div>
          {readed ? (
            <span className={styles.haveRead}>
              <FormattedMessage {...messages.haveRead} />
            </span>
          ) : (
            <span className={styles.notRead}>
              <FormattedMessage {...messages.notRead} />
            </span>
          )}
        </div>
        <div className={styles.btns}>
          <Clipboard
            className={classNames(styles.download, {
              [styles.canNotDL]: !allowDownload
            })}
            data-clipboard-text={download}
            onSuccess={() => {
              if (!isEmpty(download) && allowDownload) {
                onDownload();
              }
            }}
          >
            <i className={styles.downloadIcon} />
          </Clipboard>
          <button
            className={styles.play}
            onClick={() => {
              window.location.href = previewUrl;
            }}
          >
            <i className={styles.playIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}

CoursewareInfoCard.propTypes = {
  type: PropTypes.string,
  readed: PropTypes.bool,
  cover: PropTypes.string,
  content: PropTypes.string,
  download: PropTypes.string,
  onDownload: PropTypes.func,
  previewUrl: PropTypes.string,
  allowDownload: PropTypes.bool
};

export default CoursewareInfoCard;
