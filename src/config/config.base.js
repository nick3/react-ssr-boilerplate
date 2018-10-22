const config = {
  apiServer: '/wechat-api',
  domain: '/wechat/wechat/',
  wechatLink:
    'http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA3MDQzNzQ3MQ==#&wechat_redirect',
  deviceRatio: 3.75,
  wxShareOption: {
    title: '微助教', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接
    imgUrl:
      'http://portal.teachermate.com.cn:80/wp-content/themes/teachermate/dist/images/logo-filled-40x40.png', // 分享图标
    type: 'link', // 分享类型,music、video或link
    dataUrl: '' // 如果type是music或video，则要提供数据链接，默认为空
  },
  wxHideList: [
    'menuItem:share:qq',
    'menuItem:share:weiboApp',
    'menuItem:share:QZone',
    'menuItem:favorite',
    'menuItem:share:faceboo',
    'menuItem:copyUrl',
    'menuItem:originPage',
    'menuItem:openWithQQBrowser',
    'menuItem:openWithSafari',
    'menuItem:share:email',
    'menuItem:share:brand',
    'menuItem:share:timeline',
    'menuItem:share:appMessage'
  ],
  wxSDKList: [
    'hideMenuItems',
    'previewImage',
    'getLocation',
    'chooseImage',
    'uploadImage',
    'downloadImage',
    'scanQRCode'
  ],
  wxShareList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
  rankHomeList: ['menuItem:share:timeline', 'menuItem:share:appMessage'],
  rankShareList: ['menuItem:share:timeline', 'menuItem:share:appMessage'],
  interactCanvas: {
    strokeColor: '#8cfff6',
    axisColor: 'rgba(140, 255, 246, 0.3)',
    fillColor: 'rgba(191, 255, 255, 0.15)',
    yLines: 4, // y轴显示横线数
    heightRatio: 1.4 // 高度与最大数据比
  },
  questionType: {
    0: '问答',
    1: '单选',
    2: '填空',
    3: '多选',
    4: '多选',
    5: '单选',
    7: '填空',
    8: '组卷',
    9: '是非',
    10: '是非',
    11: '问答'
  },
  correctQuetionTypes: [1, 2, 3, 9],
  auth: {
    passwordSalt: 'weixin_assistant'
  },
  interactRankNumber: 20,
  interactTopNumber: 3,
  listLimit: 15,
  scrollThreshold: 30,
  fayeClient: '/faye',
  fayeUrl:
    'https://weixin-assistant.oss-cn-qingdao.aliyuncs.com/faye/client.js',
  joinClassSuccessRoute: '/student/join/classroom/success',
  joinClassPlusRoute: '/student/join/supplement',
  studentArchivesRoute: '/student/archive/lists'
};

export default config;
