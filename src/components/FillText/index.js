/**
 *
 * FillText
 *
 */

import React from 'react';

import InputWithProps from '../InputWithProps';
import styles from './styles.css';
const inputStyle = {
  padding: '0.05rem',
  height: '0.4rem',
  background: '#fff'
};

function FillText(props) {
  return (
    <div className={styles.fillText}>
      <InputWithProps style={inputStyle} {...props} />
    </div>
  );
}

export default FillText;
