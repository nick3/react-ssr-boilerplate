/**
 *
 * OptionList
 *
 */

import React, { PropTypes } from 'react';
import _ from 'lodash';
import styles from './styles.css';
import { FormCell, CellBody, CellFooter, Icon } from 'react-weui';

class OptionList extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    items: PropTypes.array,
    selectedItemId: PropTypes.number,
    style: PropTypes.object,
    onChange: PropTypes.func
  };

  componentWillMount() {
    if (this.props.selectedItemId && this.props.selectedItemId > 0) {
      this.defaultChecked = true;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedItemId !== this.props.selectedItemId) {
      this.defaultChecked = false;
    }
  }

  onSelect = id => {
    this.props.onChange(id);
  };

  renderItems() {
    let ret = [];
    const { items, selectedItemId } = this.props;
    if (items && items.length > 0) {
      ret = _.map(items, item => {
        let checked = false;
        if (selectedItemId === item.id) {
          checked = true;
          if (!this.defaultChecked) {
            checked = true;
          }
        }
        return (
          <FormCell
            radio
            key={item.id}
            onClick={() => {
              this.onSelect(item.id);
            }}
          >
            <CellBody>{item.title}</CellBody>
            <CellFooter>
              {checked && <Icon value="success-no-circle" />}
            </CellFooter>
          </FormCell>
        );
      });
    }
    return ret;
  }

  render() {
    const { style = {} } = this.props;
    return (
      <div className={styles.optionList} style={style}>
        {this.renderItems()}
      </div>
    );
  }
}

export default OptionList;
