/*
 * InteractCoverCard Messages
 *
 * This contains all the text for the InteractCoverCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'app.components.InteractCoverCard.title',
    defaultMessage: '占领了封面'
  },
  dialogTitle: {
    id: 'app.components.InteractCoverCard.dialogTitle',
    defaultMessage: '互动次数'
  },
  dialogContent: {
    id: 'app.components.InteractCoverCard.dialogContent',
    defaultMessage:
      '在一个自然日内：<br/>开启签到，学生参与一次算一次有效互动，本次签到有多少学生参与即记多少次互动次数；<br/>使用题目，学生参与一次算一次有效互动，本次用题有多少学生参与即记多少次互动次数；<br/>组织讨论，学生发送一条信息算一次有效互动，当日该课堂所有学生向该课堂发送多少条信息即记多少次互动次数；'
  },
  dialogSure: {
    id: 'app.components.InteractCoverCard.dialogSure',
    defaultMessage: '知道啦'
  }
});
