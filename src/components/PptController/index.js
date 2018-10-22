/**
 *
 * Pptcontroller
 *
 */

import React, { PropTypes } from 'react';
import { flowRight as compose, concat, fill, isEmpty } from 'lodash';
import styles from './styles.css';

const pageRange = 2;
let key = 0;
const fillPage = () => {
  key += 1;
  return <div key={`div-${key}`} className={styles.fillPage} />;
};

function Pptcontroller(props) {
  const { isShow, data = [], currentPage, onChange } = props;
  const onClickPage = page => () => onChange(page);
  const display = isShow && !isEmpty(data) ? '-webkit-flex' : 'none';
  const getPages = compose(
    completePages(pageRange, data.length - 1, currentPage),
    generatePages(onClickPage, pageRange, currentPage)
  );

  return (
    <div className={styles.pptcontroller} style={{ display }}>
      <div>{getPages(data, currentPage)}</div>
    </div>
  );
}

function generatePages(onClickPage, range, cPage) {
  return data =>
    data.map((item, i) => {
      if (i < cPage - range || i > cPage + range) {
        return '';
      }
      let classname = '';
      if (i < cPage) {
        classname = styles.prevPage;
      } else if (i > cPage) {
        classname = styles.nextPage;
      } else {
        classname = styles.curPage;
      }
      const page = i + 1;
      const index = page < 10 ? `0${page}` : page;
      return (
        <button
          className={classname}
          key={index}
          onClick={onClickPage(i)}
          style={{ backgroundImage: `url(${item.content})` }}
        >
          <div className={styles.mask}>
            <p className={styles.content}>{item.description}</p>
            <p className={styles.index}>{index}</p>
          </div>
        </button>
      );
    });
}

function completePages(range, total, cPage) {
  return data => {
    const pre = range - cPage;
    const suf = range - (total - cPage);
    return compose(
      completeSide(pre, fillPage, addToHead),
      completeSide(suf, fillPage, addToTail)
    )(data);
  };
}

function completeSide(side, content, fn) {
  const sideData = side > 0 ? fill(Array(side), content()) : [];
  return data => fn(data, sideData);
}

function addToHead(target, data) {
  return concat(data, target);
}

function addToTail(target, data) {
  return concat(target, data);
}

Pptcontroller.propTypes = {
  isShow: PropTypes.bool,
  data: PropTypes.array,
  currentPage: PropTypes.number,
  onChange: PropTypes.func
};

export default Pptcontroller;
