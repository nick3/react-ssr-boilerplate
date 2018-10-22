/**
 *
 * HubNavItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import styles from './styles.css';

function HubNavItem(props) {
  const {
    title,
    icon,
    link,
    query,
    openid,
    domain,
    isUrl = false,
    isLegacy = false
  } = props;
  const linkUrl = getLink(link, isUrl, isLegacy, openid, domain, query);
  return (
    <div className={styles.hubNavItem}>
      <a href={linkUrl}>
        <i className={styles[icon]} />
        <FormattedMessage {...messages[title]} />
      </a>
    </div>
  );
}

function getLink(link, isUrl, isLegacy, openid, domain, query) {
  return isUrl ? link : getLinkByVersion(link, isLegacy, openid, domain, query);
}

function getLinkByVersion(link, isLegacy, openid, domain, query) {
  if (link === 'discuss/course/list?' && query.from) {
    link += `from=${query.from}&`; // eslint-disable-line
  }
  return isLegacy
    ? `${domain}${link}openid=${openid}`
    : `${link}openid=${openid}`;
}

HubNavItem.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  openid: PropTypes.string,
  domain: PropTypes.string,
  isUrl: PropTypes.bool,
  isLegacy: PropTypes.bool,
  query: PropTypes.object
};

export default HubNavItem;
