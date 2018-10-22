/**
 *
 * ProjectionController
 *
 */

import React, { PropTypes } from 'react';
import styles from './styles.css';

class ProjectionController extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    pages: PropTypes.array,
    currentPage: PropTypes.number,
    nextPage: PropTypes.func,
    prePage: PropTypes.func
  };

  setupPages = () => {
    const { pages, currentPage, nextPage, prePage } = this.props;
    const page = [];
    if (pages) {
      const pageInfo = pages[currentPage - 1];
      if (currentPage - 1 > -1) {
        page.push(
          <button
            key={1}
            onClick={prePage}
            className={styles.defaultStyle}
            style={{
              left: '-10vw',
              backgroundImage: `url(${pageInfo.content})`
            }}
          >
            <div className={styles.cover}>
              <div className={styles.description}>{pageInfo.description}</div>
              {currentPage}
            </div>
          </button>
        );
      }
      page.push(
        <div
          key={2}
          className={styles.currentStyle}
          style={{
            backgroundImage: `url(${pages[currentPage].content})`
          }}
        >
          <div className={styles.cover}>
            <div className={styles.description}>
              {pages[currentPage].description}
            </div>
            {currentPage + 1}
          </div>
        </div>
      );
      if (currentPage + 1 < pages.length) {
        const pageInfo2 = pages[currentPage + 1];
        page.push(
          <button
            key={3}
            onClick={nextPage}
            className={styles.defaultStyle}
            style={{
              right: '-10vw',
              backgroundImage: `url(${pageInfo2.content})`
            }}
          >
            <div className={styles.cover}>
              <div className={styles.description}>{pageInfo2.description}</div>
              {currentPage + 2}
            </div>
          </button>
        );
      }
    }
    return page;
  };

  render() {
    // const { pages, currentPage } = this.props;
    return (
      <div className={styles.projectionController}>{this.setupPages()}</div>
    );
  }
}

export default ProjectionController;
