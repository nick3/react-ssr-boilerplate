/**
 *
 * wFaye.js Faye订阅发布工具
 *
 */
import config from 'config';
import { isObject } from 'lodash';
import loadScript from './loadScript';

const wFaye = {
  client: null,
  readyCallback: null,
  subscribe: () => {},
  publish: () => {},
  onReady: fn => {
    if (this.client) {
      if (typeof fn === 'function') {
        fn();
      }
    } else {
      this.readyCallback = fn;
    }
  }
};

const COURSES_CHANNEL = '/courses';
const COURSEWARES_CHANNEL = '/coursewares';

if (!wFaye.client) {
  loadScript(config.fayeUrl, () => {
    (wFaye.client = new Faye.Client(config.fayeClient)), // eslint-disable-line
      (wFaye.subscribe = (channel, fn) => {
        const url = wFaye.client.subscribe(channel, fn);
        return url;
      });

    wFaye.publish = (channal, data) => {
      if (data && !isObject(data)) {
        throw new Error('param must be object.');
      }
      return wFaye.client.publish(
        channal,
        Object.assign({}, { origin: 'wechat' }, data)
      );
    };

    if (typeof wFaye.readyCallback === 'function') {
      wFaye.readyCallback();
    }
  });
}

const msgFromPc = (msg, fn) => {
  if (msg.origin === 'pc') {
    fn(msg);
  }
};

export { msgFromPc, COURSEWARES_CHANNEL, COURSES_CHANNEL };
export default wFaye;
