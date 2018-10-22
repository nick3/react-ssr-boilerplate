/**
 *
 * generateShareInfo.js 生成微信分享文本
 *
 */
import { wxShareConfig } from 'utils/wechatSDKInit';

export function setInteractShare(pageType, data) {
  const { name, num, index } = data;
  const isVisitor = localStorage.getItem('isVisitor');
  const teacherName = isVisitor === 'true' ? name : '我';
  return wxShareConfig(pageType, {
    title: `【微助教】${teacherName}今天的课堂互动指数是${num}，校内排名第${index}` // 分享title
  });
}
