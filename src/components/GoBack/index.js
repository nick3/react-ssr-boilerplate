/**
 *
 * GoBack
 *
 */

import React, { PropTypes } from 'react';
import goback from './images/goback.png';
import styles from './styles.css';

function GoBack(props) {
  const { handleOnGoBack, style } = props;
  return (
    <div className={styles.container} style={style}>
      <button onClick={handleOnGoBack}>
        <img src={goback} alt="" />
      </button>
    </div>
  );
}

GoBack.propTypes = {
  handleOnGoBack: PropTypes.func,
  style: PropTypes.object
};

GoBack.defaultProps = {
  handleOnGoBack: () => {},
  style: {}
};

export default GoBack;
