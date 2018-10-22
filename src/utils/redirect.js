/**
 *
 * redirect.js 路由跳转工具
 *
 */

export function redirectUrl(url, router, params = {}) {
  const openid = window.localStorage.getItem('openId');
  router.push({
    pathname: url,
    query: {
      openid,
      ...params
    }
  });
}

export function redirect2JoinPlus(router, courseid, url) {
  redirectUrl('/student/join/supplement', router, {
    courseid,
    reference: encodeURIComponent(url)
  });
}

export const defaultURL = '/hub';
