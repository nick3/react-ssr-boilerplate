import { fill, join } from 'lodash';
const pdf = '/images/pdf.png';
const ppt = '/images/ppt.png';
const doc = '/images/word.png';
const xls = '/images/excel.png';
const wps = '/images/wps文字.png';
const et = '/images/wps表格.png';
const dps = '/images/wps演示.png';
const rtf = '/images/rtf.png';
const singleIcon = '/images/single.svg';
const multiIcon = '/images/multi.svg';
const yesOrNoIcon = '/images/yesOrNo.svg';
const fillBlankIcon = '/images/fillBlank.svg';
const shortAnswerIcon = '/images/shortAnswer.svg';
const testIcon = '/images/test.svg';
const questionnaireIcon = '/images/questionnaire.svg';

const activityType = {
  1: 'question',
  2: 'quiz',
  3: 'courseware',
  4: 'sign',
  5: 'discussion'
};

const signPattern = {
  sign: 0 // 签到
};

const questionPattern = {
  singleSelection: 1,
  multipleChoice: 2,
  judge: 3,
  fillInTheBlanks: 4,
  shortAnswer: 5,
  group: 6 // 题组
};

const quizPattern = {
  test: 1, // 测验
  questionnaire: 2 // 调查
};

const discussionPattern = {
  discussion: 1 // 签到
};

const getActivityType = (type = 1) => {
  let currentType = 'sign';
  if (type === 1) {
    currentType = 'sign';
  } else if (type === 2) {
    currentType = 'question';
  } else if (type === 3) {
    currentType = 'quiz';
  } else if (type === 4) {
    currentType = 'discussion';
  }
  return currentType;
};

const getSignType = (type = 0) => {
  let currentType = 'sign';
  if (type === 0) {
    currentType = 'sign';
  }
  return currentType;
};

const getQuestionType = (type = 1) => {
  let currentType = 'singleSelection';
  if (type === 1) {
    currentType = 'singleSelection';
  } else if (type === 2) {
    currentType = 'multipleChoice';
  } else if (type === 3) {
    currentType = 'judge';
  } else if (type === 4) {
    currentType = 'fillInTheBlanks';
  } else if (type === 5) {
    currentType = 'shortAnswer';
  } else if (type === 6) {
    currentType = 'group';
  }
  return currentType;
};

const getQuizType = (type = 1) => {
  let currentType = 'test';
  if (type === 1) {
    currentType = 'test';
  } else if (type === 2) {
    currentType = 'questionnaire';
  }
  return currentType;
};

const getDiscussionType = (type = 1) => {
  let currentType = 'discussion';
  if (type === 1) {
    currentType = 'discussion';
  }
  return currentType;
};

const signAssets = {
  0: {
    color: '#3b9e46',
    text: '签到',
    name: 'sign'
  }
};

const questionAssets = {
  1: {
    color: '#4cbea1',
    text: '单选',
    content: '单项选择',
    icon: singleIcon,
    name: 'singleSelection',
    backgroundImage:
      'linear-gradient(to bottom, rgba(76, 190, 161, 0.6), rgba(76, 190, 161, 1))'
  },
  2: {
    color: '#00ccde',
    text: '多选',
    content: '多项选择',
    icon: multiIcon,
    name: 'multipleChoice',
    backgroundImage:
      'linear-gradient(to bottom, rgba(0, 204, 222, 0.6), rgba(0, 204, 222, 1))'
  },
  3: {
    color: '#9b9b9b',
    text: '是非',
    content: '是非',
    icon: yesOrNoIcon,
    name: 'judge',
    backgroundImage:
      'linear-gradient(to bottom, rgba(155, 155, 155, 0.6), rgba(155, 155, 155, 1))'
  },
  4: {
    color: '#f6a623',
    text: '填空',
    content: '填空',
    icon: fillBlankIcon,
    name: 'fillInTheBlanks',
    backgroundImage:
      'linear-gradient(to bottom, rgba(245, 166, 35, 0.6), rgba(245, 166, 35, 1))'
  },
  5: {
    color: '#9012fe',
    text: '简答',
    content: '简答',
    icon: shortAnswerIcon,
    name: 'shortAnswer',
    backgroundImage:
      'linear-gradient(to bottom, rgba(144, 19, 254, 0.6), rgba(144, 19, 254, 1))'
  },
  8: {
    color: '#4A90E2',
    text: '组卷',
    content: '组卷',
    icon: testIcon,
    name: 'test',
    backgroundImage:
      'linear-gradient(to bottom, rgba(74, 144, 226, 0.6), rgba(74, 144, 226, 1))'
  }
};

const quizAssets = {
  1: {
    color: '#4A90C5',
    text: '调查',
    content: '调查',
    icon: questionnaireIcon,
    name: 'questionnaire',
    backgroundImage:
      'linear-gradient(to bottom, rgba(74, 144, 197, 0.6), rgba(74, 144, 197, 1))'
  },
  2: {
    color: '#4A90E2',
    text: '测验',
    content: '测验',
    icon: testIcon,
    name: 'test',
    backgroundImage:
      'linear-gradient(to bottom, rgba(74, 144, 226, 0.6), rgba(74, 144, 226, 1))'
  }
};

const coursewareType = {
  0: {
    color: '#bb4955',
    text: '课件',
    name: 'courseware'
  }
};

const discussionAssets = {
  0: {
    color: '#61788f',
    text: '讨论',
    name: 'discussion'
  }
};

const letter = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const quizState = {
  notOpen: 0,
  open: 1,
  answered: 2,
  answeredAndPublic: 3
};

const answerResult = {
  wrong: 0,
  half: 1,
  halfRight: 1,
  right: 2
};

const answerState = {
  notAnswered: 'noAnswer',
  right: 'right',
  wrong: 'wrong',
  half: 'half'
};

const questionStatus = {
  neverOpened: 0,
  opening: 1,
  onceOpened: 2
};

const attendanceState = {
  absent: 'absent',
  present: 'present',
  late: 'late',
  leave: 'leave'
};

// 教师答题下方的四个tab
const questionStatisticsInfoTab = {
  answerDetail: 'answerDetail',
  answerDistribution: 'answerDistribution',
  gradeDistribution: 'gradeDistribution',
  answerAndAnalysis: 'answerAndAnalysis'
};

const courseResourceType = {
  question: 'question',
  quiz: 'quiz',
  courseWare: 'courseWare'
};

const questionState = {
  open: 'open',
  close: 'close'
};

const CoursewareAssets = {
  pdf: {
    text: 'PDF',
    icon: pdf,
    backgroundImage: 'linear-gradient(135deg, rgba(187, 6, 0, 0.6), #BB0600)'
  },
  ppt: {
    text: 'POWERPOINT',
    icon: ppt,
    backgroundImage: 'linear-gradient(135deg, rgba(210, 71, 38, 0.6), #D24726)'
  },
  pptx: {
    text: 'POWERPOINT',
    icon: ppt,
    backgroundImage: 'linear-gradient(135deg, rgba(210, 71, 38, 0.6), #D24726)'
  },
  doc: {
    text: 'WORD',
    icon: doc,
    backgroundImage: 'linear-gradient(135deg, rgba(43, 87, 154, 0.6), #2B579A)'
  },
  docx: {
    text: 'WORD',
    icon: doc,
    backgroundImage: 'linear-gradient(135deg, rgba(43, 87, 154, 0.6), #2B579A)'
  },
  xls: {
    text: 'EXCEL',
    icon: xls,
    backgroundImage: 'linear-gradient(135deg, rgba(33, 115, 70, 0.6), #217346)'
  },
  xlsx: {
    text: 'EXCEL',
    icon: xls,
    backgroundImage: 'linear-gradient(135deg, rgba(33, 115, 70, 0.6), #217346)'
  },
  wps: {
    text: 'WPS文字',
    icon: wps,
    backgroundImage: 'linear-gradient(135deg, rgba(52, 124, 237, 0.6), #347CED)'
  },
  et: {
    text: 'WPS表格',
    icon: et,
    backgroundImage: 'linear-gradient(135deg, rgba(99, 188, 36, 0.6), #63BC24)'
  },
  dps: {
    text: 'WPS演示',
    icon: dps,
    backgroundImage: 'linear-gradient(135deg, rgba(247, 128, 11, 0.6), #F7800B)'
  },
  rtf: {
    text: 'RTF',
    icon: rtf,
    backgroundImage: 'linear-gradient(135deg, rgba(53, 105, 207, 0.6), #3569CF)'
  }
};

function getLevel(level = 0) {
  return join(fill(Array(level), '☆'), '');
}

const getQuestionTypeNumber = type => {
  let num;
  if (type === 1 || type === 5) {
    num = 1;
  } else if (type === 3 || type === 4) {
    num = 2;
  } else if (type === 9 || type === 10) {
    num = 3;
  } else if (type === 2 || type === 7) {
    num = 4;
  } else if (type === 11 || type === 0) {
    num = 5;
  } else if (type === 8) {
    num = 8;
  }
  return num;
};

const getOrgId = () => {
  // const orgId = window.localStorage.getItem('orgId');
  // if (orgId === 'null' || orgId === 'undefined') {
  //   return null;
  // }
  // return orgId;
  return null;
};

const setOrgId = () => {
  // if (orgId && orgId !== 'null' && orgId !== 'undefined') {
  //   window.localStorage.setItem('orgId', orgId);
  // }
};

const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
const DAEMON = '@@saga-injector/daemon';
const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export {
  RESTART_ON_REMOUNT,
  DAEMON,
  ONCE_TILL_UNMOUNT,
  activityType,
  signPattern,
  questionPattern,
  quizPattern,
  discussionPattern,
  getActivityType,
  getSignType,
  getQuestionType,
  getQuizType,
  getDiscussionType,
  signAssets,
  questionAssets,
  quizAssets,
  discussionAssets,
  letter,
  quizState,
  answerResult,
  answerState,
  questionStatus,
  attendanceState,
  questionStatisticsInfoTab,
  courseResourceType,
  questionState,
  CoursewareAssets,
  coursewareType,
  getLevel,
  getQuestionTypeNumber,
  getOrgId,
  setOrgId
};
