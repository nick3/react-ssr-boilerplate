/**
 *
 * LinkCell
 *
 */

import React, { PropTypes } from 'react';

import styles from './styles.css';
import { Cell, CellHeader, CellBody, CellFooter, Label } from 'react-weui';

function LinkCell(props) {
  const { link, header, body, footer, headerStyle, onClickFunc, style } = props;
  return (
    <Cell
      href={link}
      className={styles.linkCell}
      access
      onClick={onClickFunc}
      style={style}
    >
      <CellHeader style={headerStyle}>
        <Label>
          <span className={styles.fontHack}>{header}</span>
        </Label>
      </CellHeader>
      <CellBody className={styles.cellBody}>{body}</CellBody>
      <CellFooter>{footer}</CellFooter>
    </Cell>
  );
}

LinkCell.propTypes = {
  link: PropTypes.string,
  header: PropTypes.object,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  footer: PropTypes.object,
  headerStyle: PropTypes.object,
  onClickFunc: PropTypes.func,
  style: PropTypes.object
};

export default LinkCell;
