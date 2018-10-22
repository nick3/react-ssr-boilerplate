/**
 *
 * FillTextarea
 *
 */

import React from 'react';

import TextAreaWithProps from '../TextAreaWithProps';
import styles from './styles.css';

const textareaStyle = {
  padding: '0.05rem',
  background: '#fff'
};

function FillTextarea(props) {
  return (
    <div className={styles.fillTextarea}>
      <TextAreaWithProps style={textareaStyle} {...props} />
    </div>
  );
}

export default FillTextarea;
