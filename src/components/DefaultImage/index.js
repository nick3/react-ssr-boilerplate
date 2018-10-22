/**
 *
 * DefaultImage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const onLoadError = defaultImg => e => {
  const { target } = e;
  target.src = defaultImg;
};

function DefaultImage(props) {
  const { defaultImg, src = defaultImg, alt, role, className, style } = props;

  return (
    <img
      alt={alt}
      role={role}
      className={className}
      style={style}
      src={src || defaultImg}
      onError={onLoadError(defaultImg)}
    />
  );
}

DefaultImage.propTypes = {
  defaultImg: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default DefaultImage;
