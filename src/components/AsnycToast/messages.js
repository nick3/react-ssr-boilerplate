/*
 * AsnycToast Messages
 *
 * This contains all the text for the AsnycToast component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loading: {
    id: 'app.components.AsnycToast.loading',
    defaultMessage: 'loading...'
  },
  notFound: {
    id: 'app.components.AsnycToast.notFound',
    defaultMessage: '数据加载出错'
  },
  unauthorized: {
    id: 'app.components.AsnycToast.unauthorized',
    defaultMessage: '没有访问权限'
  }
});
