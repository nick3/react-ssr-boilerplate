/**
 *
 * FillImage
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import AvatarImg from '../AvatarImg';
// import { wxUploadImage } from 'utils/wechatSDKInit';
import { Button } from 'react-weui';
import styles from './styles.css';

// const upload = (onChange) => () => wxUploadImage(onChange);
// const imageOnChange = (onChange) => (e) => {
//   const pc = new PhotoClip('#hehehehe');
//   pc.size(200, 200);
//   const file = e.target.files[0];
//   pc.load(file);
//   if (file) {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = (ev) => {
//       const src = ev.target.result;
//       onChange(src);
//     };
//   }
// };

function FillImage(props) {
  const { value, onChange, btnWidth } = props;
  return (
    <div className={styles.fillImage}>
      <br />
      <AvatarImg className={styles.image} src={value} size={200} />
      <br />
      <div className={styles.btnArea}>
        <input
          className={styles.uploader}
          type="file"
          accept="image/*;capture=camera"
          onChange={onChange}
        />
        <Button style={{ width: btnWidth }}>
          <FormattedMessage {...messages.upload} />
        </Button>
      </div>
    </div>
  );
}

FillImage.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  btnWidth: PropTypes.string
};

export default FillImage;
