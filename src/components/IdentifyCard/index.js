import React from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import CircleImg from '../CircleImg';
// import messages from './messages';

import styles from './styles.css';

function IdentifyCard(props) {
  const { avatar, name, description, subDescription, link, isRegister } = props;
  const style = {
    backgroundImage: `url(${avatar})`
  };
  const linkHref = link ? (
    <a href={link}>
      <i className={styles.link} />
    </a>
  ) : null;

  return (
    <div className={styles.identifyCard}>
      <div className={styles.imgSection}>
        <CircleImg size={75} src={avatar} />
      </div>
      {isRegister ? (
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.subDescription}>{subDescription}</div>
        </div>
      ) : (
        <div className={styles.unregister}>{name}</div>
      )}
      {linkHref}
      <div className={styles.background} style={style} />
    </div>
  );
}

IdentifyCard.propTypes = {
  avatar: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  subDescription: PropTypes.string,
  link: PropTypes.string,
  isRegister: PropTypes.bool
};

export default IdentifyCard;
