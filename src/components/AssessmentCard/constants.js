export const TYPEASSETS = {
  Personal: {
    name: '个人互评',
    color: '#EFE113',
    key: 'Personal',
    type: 1,
    checked: true
  },
  Group: {
    name: '组间互评',
    color: '#F5A623',
    key: 'Group',
    type: 2,
    checked: true
  },
  InGroup: {
    name: '组内互评',
    color: '#50E3C2',
    key: 'InGroup',
    type: 2
  },
  Self: {
    name: '自评',
    color: '#9013FE',
    key: 'Self'
  },
  Teacher: {
    name: '师评',
    color: '#4A90E2',
    key: 'Teacher'
  }
};

export const Types = [
  TYPEASSETS.Personal,
  TYPEASSETS.Group,
  TYPEASSETS.InGroup,
  TYPEASSETS.Self,
  TYPEASSETS.Teacher
];

export const STATUS = {
  Open: {
    title: '开启中',
    color: '#FF3E81',
    className: 'statusOpen'
  },
  Close: {
    title: '已关闭',
    color: '#9B9B9B',
    className: 'statusClose'
  },
  Fresh: {
    title: '未开启',
    color: '#9B9B9B',
    className: 'statusClose'
  },
  fromStatusCode: code => {
    switch (code) {
      case 0:
        return STATUS.Fresh;
      case 1:
        return STATUS.Open;
      case 2:
        return STATUS.Close;
      default:
        return null;
    }
  }
};
