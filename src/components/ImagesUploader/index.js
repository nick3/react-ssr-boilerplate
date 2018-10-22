/**
 *
 * ImagesUploader
 *
 */

import React, { PropTypes } from 'react';
import {
  Form,
  Cell,
  CellBody,
  Uploader,
  Gallery,
  GalleryDelete
} from 'react-weui';

import styles from './styles.css';

function stopPropagation(e) {
  e.preventDefault();
  e.stopPropagation();
}

function ImagesUploader(props) {
  const {
    files,
    gallery = {},
    onUpload,
    onImageClick,
    onCloseGallery,
    onDeleteImage
  } = props;
  const isGalleryShow = !!gallery.url;
  const onUploadImge = file => {
    onUpload(file);
  };
  const onClickImage = (_, file, i) => {
    onImageClick(file, i);
  };
  const onImageDelete = id => () => onDeleteImage(id);
  const onUploadError = msg => {
    alert(msg); // eslint-disable-line
  };
  function onClickGallery(e) {
    stopPropagation(e);
    onCloseGallery();
  }

  return (
    <div className={styles.imagesUploader}>
      <Gallery src={gallery.url} show={isGalleryShow} onClick={onClickGallery}>
        <GalleryDelete onClick={onImageDelete(gallery.id)} />
      </Gallery>
      <Form>
        <Cell>
          <CellBody>
            <Uploader
              title=""
              maxCount={3}
              files={files}
              onChange={onUploadImge}
              onFileClick={onClickImage}
              onError={onUploadError}
            />
          </CellBody>
        </Cell>
      </Form>
    </div>
  );
}

ImagesUploader.propTypes = {
  files: PropTypes.array,
  onUpload: PropTypes.func,
  onImageClick: PropTypes.func,
  onCloseGallery: PropTypes.func,
  onDeleteImage: PropTypes.func,
  gallery: PropTypes.object
};

export default ImagesUploader;
