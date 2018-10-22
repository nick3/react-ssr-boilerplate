import React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'react-intl';

const MyDocumentTitle = injectIntl(({ title, value, intl }) => (
  <Helmet title={intl.formatMessage(title, value)} />
));

export default MyDocumentTitle;
