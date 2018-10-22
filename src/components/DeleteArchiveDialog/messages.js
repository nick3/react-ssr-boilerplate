/*
 * DeleteArchiveDialog Messages
 *
 * This contains all the text for the DeleteArchiveDialog component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.components.DeleteArchiveDialog.title',
    defaultMessage: '您是否确认删除该档案'
  },
  content: {
    id: 'app.components.DeleteArchiveDialog.content',
    defaultMessage: '本操作不可撤销'
  },
  cancle: {
    id: 'app.components.DeleteArchiveDialog.cancle',
    defaultMessage: '我点错了'
  },
  sure: {
    id: 'app.components.DeleteArchiveDialog.sure',
    defaultMessage: '确认删除'
  }
});
