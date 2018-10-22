/**
 *
 * InfoCard
 *
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';

function InfoCard(props) {
  const {
    content,
    imgSrc,
    title,
    titleRight,
    foot,
    footRight,
    contentRightBtn,
    style,
    isArchived,
    orgId
  } = props;
  const headImg = {
    backgroundImage: `url(${imgSrc})`
  };
  const backgroudImg = {
    backgroundImage: `url(${imgSrc}?bg)`
  };
  return (
    <div className={styles.infoCard} style={style}>
      <div className={styles.imgSection} style={headImg}>
        {orgId && <div className={styles.attest}>校方认证</div>}
      </div>
      <div className={styles.infoSection}>
        <div className={styles.infoHeader}>
          {title}
          {isArchived === 1 ? (
            <div className={styles.isArchived}>
              <span className={styles.isArchivedText}>{titleRight}</span>
            </div>
          ) : (
            <span className={styles.green}>{titleRight}</span>
          )}
        </div>
        {contentRightBtn ? (
          <div className={styles.contentBtnSection}>
            <div className={styles.infoContent} style={{ marginRight: '75px' }}>
              {content}
            </div>
            <div className={styles.rigthBtn}>{contentRightBtn}</div>
          </div>
        ) : (
          <div
            className={styles.infoContent}
            style={orgId ? { color: '#00C4B2' } : {}}
          >
            {content}
          </div>
        )}
        <div className={styles.infoFooter}>
          {foot}
          <span>{footRight}</span>
        </div>
      </div>
      <div className={styles.infoSectionBg} style={backgroudImg} />
    </div>
  );
}

InfoCard.propTypes = {
  content: PropTypes.string,
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  titleRight: PropTypes.object,
  foot: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  footRight: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  contentRightBtn: PropTypes.object,
  style: PropTypes.object,
  isArchived: PropTypes.number,
  orgId: PropTypes.number
};

export default InfoCard;
