/**
 *
 * SuccessPage
 *
 */

import React, { PropTypes } from 'react';
import { Button } from 'react-weui';
import styles from './styles.css';

function SuccessPage(props) {
  const {
    icon,
    title,
    description,
    primaryBtnText,
    defaultBtnText,
    primaryBtnFunc,
    defaultBtnFunc
  } = props;
  return (
    <div className={styles.successPage}>
      {icon}
      <div className={styles.title}>{title}</div>
      {description}
      {primaryBtnText && (
        <Button className={styles.button} onClick={primaryBtnFunc}>
          {primaryBtnText}
        </Button>
      )}
      {defaultBtnText && (
        <Button className={styles.backBtn} onClick={defaultBtnFunc} default>
          {defaultBtnText}
        </Button>
      )}
    </div>
  );
}

SuccessPage.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.object,
  description: PropTypes.object,
  primaryBtnText: PropTypes.object,
  defaultBtnText: PropTypes.object,
  primaryBtnFunc: PropTypes.func,
  defaultBtnFunc: PropTypes.func
};

export default SuccessPage;
