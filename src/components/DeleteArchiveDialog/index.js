/**
 *
 * DeleteArchiveDialog
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import { Dialog } from 'react-weui';
import messages from './messages';

function DeleteArchiveDialog(props) {
  const { isShow, onCancle, onConfirm } = props;
  return (
    <div>
      <Dialog
        title={<FormattedMessage {...messages.title} />}
        buttons={[
          {
            type: 'default',
            label: <FormattedMessage {...messages.cancle} />,
            onClick: onCancle
          },
          {
            type: 'primary',
            label: <FormattedMessage {...messages.sure} />,
            onClick: onConfirm
          }
        ]}
        show={isShow}
      >
        <FormattedMessage {...messages.content} />
      </Dialog>
    </div>
  );
}

DeleteArchiveDialog.propTypes = {
  isShow: PropTypes.bool,
  onCancle: PropTypes.func,
  onConfirm: PropTypes.func
};

export default DeleteArchiveDialog;
