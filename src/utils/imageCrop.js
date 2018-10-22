/**
 *
 * imageCrop.js 图片裁剪组件 基于alloycrop
 *
 */
import PhotoClip from 'photoclip';

const base64ToBlob = image => {
  const sliceSize = sliceSize || 512;
  const byteCharacters = atob(image.split(',')[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: 'image/png' });
};

const setupClipField = clipPhoto => {
  const pc = new PhotoClip(`#${clipPhoto}`);
  pc.size(200, 200);
  return pc;
};

export { base64ToBlob, setupClipField };
