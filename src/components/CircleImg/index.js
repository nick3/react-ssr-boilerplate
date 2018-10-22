import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';
import DefaultImage from '../DefaultImage';

const defaultAvatar = '/images/default_avatar.png';

function CircleImg(props) {
  const { src, size, className } = props;
  const imgStyle = {
    width: size,
    height: size
  };
  return (
    <DefaultImage
      className={className || styles.circleImg}
      role="presentation"
      src={src}
      style={imgStyle}
      defaultImg={defaultAvatar}
    />
  );
}

CircleImg.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
};

export default CircleImg;
