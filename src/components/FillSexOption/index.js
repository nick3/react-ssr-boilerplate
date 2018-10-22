/**
 *
 * FillSexOption
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import { Form, FormCell, CellBody, CellFooter, Radio } from 'react-weui';
import styles from './styles.css';

const RadioWithProps = injectIntl(
  ({ value, name, onChange, intl, currentValue }) => {
    const propsValue = intl.formatMessage(value);
    const isChecked = propsValue === currentValue;
    return (
      <Radio
        value={propsValue}
        name={name}
        onChange={onChange}
        checked={isChecked}
        rows="3"
        maxLength={60}
      />
    );
  }
);

function FillSexOption(props) {
  const { value, onChange } = props;
  return (
    <div className={styles.fillSexOption}>
      <Form radio>
        <FormCell radio>
          <CellBody>
            <FormattedMessage {...messages.male} />
          </CellBody>
          <CellFooter>
            <RadioWithProps
              name="sex"
              value={messages.male}
              onChange={onChange}
              currentValue={value}
            />
          </CellFooter>
        </FormCell>
        <FormCell radio>
          <CellBody>
            <FormattedMessage {...messages.female} />
          </CellBody>
          <CellFooter>
            <RadioWithProps
              name="sex"
              value={messages.female}
              onChange={onChange}
              currentValue={value}
            />
          </CellFooter>
        </FormCell>
      </Form>
    </div>
  );
}

FillSexOption.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default FillSexOption;
