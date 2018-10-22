/**
 *
 * SearchList
 *
 */

import React, { PropTypes } from 'react';
import OptionList from '../OptionList';
import styles from './styles.css';
import SearchBar from '../SearchBar';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { debounceTime } from 'utils/format';

class SearchList extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    items: PropTypes.array,
    selectedItemId: PropTypes.number,
    style: PropTypes.object,
    optionListStyle: PropTypes.object,
    placeholder: PropTypes.object,
    onChange: PropTypes.func,
    comboBox: PropTypes.bool,
    createMsg: PropTypes.object,
    defaultShow: PropTypes.bool,
    onCancel: PropTypes.func
  };

  state = {
    filteredItems: []
  };

  componentWillReceiveProps(nextProps) {
    const { defaultShow, items, selectedItemId } = nextProps;
    if (!this.props.items && items && defaultShow) {
      this.setState({
        filteredItems: nextProps.items
      });
    }
    if (items && selectedItemId && !defaultShow) {
      _.forEach(items, item => {
        if (item.id === selectedItemId) {
          this.setState({ filteredItems: [item] });
          return false;
        }
        return true;
      });
    }
  }

  onSeachBarChange = debounceTime(text => {
    const { items, createMsg } = this.props;
    const trimText = text && text.trim();
    const filteredItems = trimText
      ? _.filter(items, item => item.title.indexOf(trimText) >= 0)
      : [];
    if (
      this.props.comboBox &&
      filteredItems.length === 0 &&
      trimText &&
      createMsg
    ) {
      filteredItems.push({
        id: -1,
        title: (
          <FormattedMessage
            {...createMsg}
            values={{ text: <b>{trimText}</b> }}
          />
        )
      });
    }
    this.setState({
      filteredItems
    });
    this.text = text;
  });

  onChange = id => {
    const { onChange } = this.props;
    onChange(id, this.text);
  };

  text = '';

  render() {
    const {
      selectedItemId,
      style = {},
      optionListStyle,
      placeholder,
      onCancel
    } = this.props;
    const { filteredItems } = this.state;
    return (
      <div className={styles.searchList} style={style}>
        <SearchBar
          placeholder={placeholder}
          onChange={text => {
            this.onSeachBarChange(text)();
          }}
          onCancel={onCancel}
          onSubmit={() => false}
        />
        <OptionList
          items={filteredItems}
          selectedItemId={selectedItemId}
          optionListStyle={optionListStyle}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default SearchList;
