/**
 *
 * CoursewareCard
 *
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { CoursewareAssets } from '../../utils/constants';
import { isEmpty } from 'lodash';
import Clipboard from 'react-clipboard.js';

function CoursewareCard(props) {
  const {
    title,
    cover,
    type,
    code,
    name,
    teacherName,
    allowDownload,
    download,
    previewUrl,
    onDownload
  } = props;
  const backgroundImage = `url(${cover})`;
  const { backgroundImage: bg } = CoursewareAssets[type];
  return (
    <div className={styles.coursewareCard}>
      <div className={styles.previewDiv} style={{ backgroundImage: bg }}>
        <div className={styles.coverDiv} style={{ backgroundImage }}>
          <button
            className={styles.previewUrl}
            onClick={() => {
              if (!isEmpty(previewUrl)) {
                window.location.href = previewUrl;
              }
            }}
          >
            <div className={styles.playIcon} />
            <FormattedMessage {...messages.start} />
          </button>
          {allowDownload && (
            <Clipboard
              className={styles.download}
              data-clipboard-text={download}
              onSuccess={() => {
                if (!isEmpty(download) && allowDownload) {
                  onDownload();
                }
              }}
            >
              <div className={styles.downloadIcon} />
            </Clipboard>
          )}
        </div>
      </div>
      <div className={styles.infoDiv}>
        <div className={styles.info}>
          <div className={styles.title}>{title}</div>
          <div className={styles.code}>{`${code} ${name}`}</div>
          <div className={styles.teacher}>
            <FormattedMessage {...messages.teacher} />
            {`：${teacherName}`}
          </div>
        </div>
      </div>
    </div>
  );
}

CoursewareCard.propTypes = {
  type: PropTypes.string,
  code: PropTypes.string,
  name: PropTypes.string,
  cover: PropTypes.string,
  title: PropTypes.string,
  download: PropTypes.string,
  onDownload: PropTypes.func,
  previewUrl: PropTypes.string,
  teacherName: PropTypes.string,
  allowDownload: PropTypes.bool
};

export default CoursewareCard;
