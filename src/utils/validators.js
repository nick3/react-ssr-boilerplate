import { forEach } from 'lodash';

function validatorMaker(msg, fun) {
  const f = (...args) => fun.apply(fun, args);
  f.msg = msg;
  return f;
}

export function validate(target = {}, options = {}) {
  const res = [];
  forEach(options, (validators, key) => {
    forEach(validators, validator => {
      const result = validator(target[key]);
      if (!result) {
        res.push(`${key} ${validator.msg}`);
      }
    });
  });
  return res;
}

// 必填
export function isRequired() {
  return validatorMaker('required', target => !!target);
}

// 邮箱验证
export function isMail() {
  return validatorMaker('invalid email address', target =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(target)
  );
}

// 全数字
export function isNumber() {
  return validatorMaker('must be a number', target => !isNaN(target));
}

// 手机号码验证
export function isPhoneNum() {
  return validatorMaker('must be a phone number', target =>
    /^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(target)
  );
}

// 密码验证
export function isPsd() {
  return validatorMaker('Must be a qualified password', target =>
    /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/.test(target)
  );
}

// 是否等于
export function isSame(str) {
  return validatorMaker('Must equel to target', target => target === str);
}

// 是否相同
export function isPasswordSame(str) {
  return validatorMaker('Passwords not same', target => {
    let result = false;
    if (str === target) {
      result = true;
    }
    return result;
  });
}
