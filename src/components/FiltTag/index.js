/**
 *
 * FiltTag
 *
 */

import React, { PropTypes } from 'react';
import { map, includes } from 'lodash';
import classNames from 'classnames';
import styles from './styles.css';

function FiltTag(props) {
  const { tags, selectedTags, tagOnClick } = props;
  const tagsArr = map(tags, tag => {
    const { id, name, text } = tag;
    const seleted = includes(selectedTags, id);
    return (
      <button
        key={`tag_${id}`}
        id={id}
        onClick={tagOnClick}
        className={classNames(styles.filtTag, { [styles.onSelected]: seleted })}
      >
        <button className={styles.cover} id={id} />
        {name || text}
        {seleted && <div className={styles.triangle} />}
        {seleted && <div className={styles.line} />}
        {seleted && (
          <div className={styles.line} style={{ transform: 'rotate(45deg)' }} />
        )}
      </button>
    );
  });
  return <div className={styles.tags}>{tagsArr}</div>;
}

FiltTag.propTypes = {
  tags: PropTypes.array,
  selectedTags: PropTypes.array,
  tagOnClick: PropTypes.func
};

export default FiltTag;
