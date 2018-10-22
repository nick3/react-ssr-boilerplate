/**
 *
 * MsgPage
 *
 */

import React from 'react';
import { Msg } from 'react-weui';
import { injectIntl } from 'react-intl';

const MsgPage = injectIntl(
  ({
    type,
    title,
    description,
    primaryBtn,
    defaultBtn,
    intl,
    primaryBtnClick,
    defaultBtnClick,
    authenticateBtn,
    discriptionWords,
    authenticateBtnClick
  }) => {
    const primaryLabel = primaryBtn && intl.formatMessage(primaryBtn);
    const defaultLabel = defaultBtn && intl.formatMessage(defaultBtn);
    const buttons = [
      { type: 'primary', label: primaryLabel, onClick: primaryBtnClick },
      { type: 'default', label: defaultLabel, onClick: defaultBtnClick }
    ];
    if (authenticateBtn) {
      const authenticateLabel = intl.formatMessage(authenticateBtn);
      buttons.splice(1, 0, {
        type: 'default',
        label: authenticateLabel,
        onClick: authenticateBtnClick
      });
    }

    return (
      <Msg
        type={type}
        title={intl.formatMessage(title)}
        description={intl.formatMessage(description, { ...discriptionWords })}
        buttons={buttons}
      />
    );
  }
);

export default MsgPage;
