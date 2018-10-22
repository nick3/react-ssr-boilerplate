/**
 * jssdk.js
 *
 * 配置微信接口
 */

/* eslint-disable */
import 'whatwg-fetch';
import config from '../config';
import { difference, merge, concat } from 'lodash';
function parseJSON(response) {
  return response.json();
}

const WXError = err => {
  console.log(err);
};

const isInWeChat = /micromessenger/i.test(navigator.userAgent);
const isInDingDing = /DingTalk/i.test(navigator.userAgent);

const wxShareConfig = (() => {
  const configCache = {};
  return (pageType, options = {}) => {
    const configOptions = configCache[pageType]
      ? merge({}, configCache[pageType], options)
      : (configCache[pageType] = merge({}, config.wxShareOption, options));
    config.wxShareList.forEach(item => {
      wx[item](configOptions);
    });
  };
})();

const WXReady = (pageType, shareUrl) => () => {
  // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
  if (isInWeChat) {
    const shareList = config[`${pageType}List`] || [];
    wx.hideMenuItems({
      menuList: difference(config.wxHideList, shareList)
    });

    if (shareUrl) {
      wxShareConfig(pageType, {
        link: shareUrl
      });
    }
  }
};

const configWX = res => {
  if (isInWeChat) {
    wx.config({
      debug: false,
      appId: res.appId,
      timestamp: res.timestamp,
      nonceStr: res.nonceStr,
      signature: res.signature,
      jsApiList: concat(config.wxSDKList, config.wxShareList)
    });

    wx.error(WXError);

    wx.ready(WXReady(res.pageType, res.shareUrl));
  }
};

function fetchWXPackage(pageType, openId) {
  if (isInWeChat) {
    const requestUrl = `/api/v1/wechat/js-sdk/config`;
    let data = new FormData();
    data.append('url', window.location.href);
    data.append('openid', openId);
    data.append('pageType', pageType);

    fetch(requestUrl, {
      method: 'POST',
      body: data
    })
      .then(parseJSON)
      .then(configWX);
  }
}

function enableWX() {
  if (!isInWeChat && !isInDingDing) {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：您必须使用微信或钉钉内置浏览器访问本页面！');
    // 以下代码是用javascript强行关闭当前页面
    var opened = window.open('about:blank', '_self');
    opened.opener = null;
    opened.close();
  }
}

function wxUploadImage(callback) {
  if (isInWeChat) {
    chooseImage()
      .then(uploadImage)
      .then(downloadImage)
      .then(callback)
      .catch(err => console.log(err));
  }
}

function chooseImage() {
  if (isInWeChat) {
    return new Promise(resolve => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: res => {
          resolve(res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    });
  }
}

function uploadImage(localIds) {
  if (isInWeChat) {
    return new Promise(resolve => {
      wx.uploadImage({
        localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          resolve(res.serverId); // 返回图片的服务器端ID
        }
      });
    });
  }
}

function downloadImage(serverId) {
  if (isInWeChat) {
    return new Promise(resolve => {
      wx.downloadImage({
        serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: res => {
          res.serverId = serverId;
          resolve(res);
        }
      });
    });
  }
}

function closeWindow() {
  if (isInWeChat) {
    wx.closeWindow();
  }
}

function closeWindowInDD() {
  dd.biz.navigation.close({
    onSuccess: function(result) {},
    onFail: function(err) {
      console.log('closeWindowInDD error', err);
    }
  });
}

function scanQRCode(cb) {
  if (isInWeChat) {
    wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: function(res) {
        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        cb(result);
      }
    });
  }
}

export {
  fetchWXPackage,
  enableWX,
  wxShareConfig,
  isInWeChat,
  uploadImage,
  closeWindow,
  wxUploadImage,
  isInDingDing,
  closeWindowInDD,
  scanQRCode
};
