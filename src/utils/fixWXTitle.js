/**
 *
 * fixWXTitle.js 修复微信不能修改title
 *
 */
const fixWXTitle = (title, callback) => {
  document.title = title;
  const iframe = document.createElement('iframe');
  iframe.src = 'img/logn.png';
  const listener = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', listener);
      setTimeout(() => {
        document.body.removeChild(iframe);
        if (typeof callback === 'function') {
          callback();
        }
      }, 20);
    }, 0);
  };
  iframe.addEventListener('load', listener);
  document.body.appendChild(iframe);
};

export default fixWXTitle;
