/**
 *
 * ChapterSelector
 *
 */

import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Cells, Cell, CellFooter, CellBody, Select } from 'react-weui';
import _ from 'lodash';
import styles from './styles.css';

const defaultChapter = [
  {
    value: '',
    label: '全部'
  },
  {
    value: 0,
    label: '未指定章节'
  }
];

function changeChapter(onChange) {
  return e => {
    const chapterId = e.target.value;
    onChange(chapterId);
  };
}

function ChapterSelector({ data, value, onChangeChapter, chapterIds }) {
  const chapters = defaultChapter.concat(
    generateChaptersData(data, chapterIds)
  );
  return (
    <div className={styles.chapterSelector}>
      <Cells className={styles.chapters}>
        <Cell access>
          <CellBody>
            <Select
              className={styles.chapterSelect}
              data={chapters}
              value={value}
              onChange={changeChapter(onChangeChapter)}
            />
          </CellBody>
          <CellFooter>
            <FormattedMessage {...messages.chapter} />
          </CellFooter>
        </Cell>
      </Cells>
    </div>
  );
}

function generateChaptersData(data, chapterIds) {
  return _.map(chapterIds, id => {
    const chapter = data[id];
    // console.log('@@@@@@@', chapter);
    return {
      value: chapter.id,
      label: chapter.name
    };
  });
}

ChapterSelector.propTypes = {
  data: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]),
  onChangeChapter: PropTypes.func,
  value: PropTypes.string,
  chapterIds: PropTypes.array
};

export default ChapterSelector;
