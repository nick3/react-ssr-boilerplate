/*
 * AuthHeader Messages
 *
 * This contains all the text for the AuthHeader component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  teacherInfo: {
    id: 'app.containers.AuthHeader.teacherInfo',
    defaultMessage: '请输入您已注册的账号信息'
  },
  bindTeacherInfo: {
    id: 'app.containers.AuthHeader.bindTeacherInfo',
    defaultMessage: '绑定您的常用邮箱'
  },
  goSign: {
    id: 'app.containers.AuthHeader.goSign',
    defaultMessage: '还没有教师帐号？'
  }
});
