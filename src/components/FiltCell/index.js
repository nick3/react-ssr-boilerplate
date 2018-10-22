/**
 *
 * FiltCell
 *
 */

import React, { PropTypes } from 'react';
import { map, includes } from 'lodash';
import classNames from 'classnames';
import styles from './styles.css';
import { Icon } from 'react-weui';

function FiltCell(props) {
  const { cells, selectedCells, cellOnClick, ids } = props;
  const arr = map(cells, (cell, i) => {
    const { name, isRequired, index, id } = cell;
    const showIndex = !!index && !isRequired;
    const onSeleted =
      includes(ids, `${id}`) || selectedCells.indexOf(name) > -1;
    return (
      <button
        className={classNames(styles.filtCell, {
          [styles.onSelected]: onSeleted
        })}
        id={name}
        key={`${name}-${i}`}
        value={id}
        onClick={cellOnClick}
      >
        <div className={styles.iconBox}>
          {onSeleted && (
            <Icon className={styles.icon} value="success-no-circle" />
          )}
        </div>
        {showIndex && (
          <div
            className={classNames(styles.indexBox, {
              [styles.selectedIndex]: onSeleted
            })}
          >
            <p className={styles.index}>{index}</p>
          </div>
        )}
        {isRequired && (
          <i
            className={classNames(styles.inBoxIcon, {
              [styles.selectedIndex]: onSeleted
            })}
          />
        )}
        {name}
      </button>
    );
  });
  return <div className={styles.cells}>{arr}</div>;
}

FiltCell.propTypes = {
  ids: PropTypes.array,
  cells: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  selectedCells: PropTypes.array,
  cellOnClick: PropTypes.func
};

export default FiltCell;
