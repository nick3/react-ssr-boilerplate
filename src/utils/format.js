/**
 *
 * format.js 一些用于格式化的工具
 *
 */
import moment from 'moment';
import { flowRight as compose, curry, map, reduce, last, first } from 'lodash';

const split = curry((type, object) => object.split(type));
const join = curry((type, object) => object.join(type));
const curryMap = curry((fun, object) => map(object, fun));
const currentDate = () => new Date();

const upperCaseHead = string => `${string[0].toUpperCase()}${string.slice(1)}`;
const lowerCaseHead = string => `${string[0].toLowerCase()}${string.slice(1)}`;

// formatMsg :: String -> String
export function formatMsg(string) {
  return string
    ? compose(
        lowerCaseHead,
        join(''),
        curryMap(upperCaseHead),
        split(' ')
      )(string)
    : '';
}

const toSecond = number => number / 1000;
const toMinute = number => number / (1000 * 60);
const toHour = number => number / (1000 * 60 * 60);
const toDay = number => number / (1000 * 60 * 60 * 24);
const toMonth = number => number / (1000 * 60 * 60 * 24 * 30);
const toYear = number => number / (1000 * 60 * 60 * 24 * 365);
const moreThanOne = number => number > 1;
const checkerMaker = curry((validater, [fn, msg]) => {
  const f = target =>
    compose(
      validater,
      fn
    )(target);
  f.msg = msg;
  f.getValue = fn;
  return f;
});

// 返回传入的函数中返回值不为false的值及函数名
const checker = curry(funs => arg =>
  reduce(
    funs,
    (result, fun) => {
      if (fun(arg)) result.push({ type: fun.msg, value: fun.getValue(arg) });
      return result;
    },
    []
  )
);

// timeDifference :: Date -> String
export function timeDifference(time, targetTime = currentDate().getTime()) {
  const funArray = [
    [toSecond, 'toSecond'],
    [toMinute, 'toMinute'],
    [toHour, 'toHour'],
    [toDay, 'toDay'],
    [toMonth, 'toMonth'],
    [toYear, 'toYear']
  ];
  const checkers = map(funArray, checkerMaker(moreThanOne));
  const resultFun = compose(
    last,
    checker(checkers)
  );
  return resultFun(targetTime - time);
}

const dayTime = i => i * 1000 * 60 * 60 * 24;
const formatDay = date => moment(date).format('YYYY-MM-DD');
const getDataArray = (number, fn) =>
  map(new Array(number), (_, i) => fn(number - i));

// getDataByDate :: Number -> [a]
export function getDataByDate(total) {
  const initFn = i => {
    const res = {
      date: formatDay(new Date().getTime() - dayTime(i)),
      interaction_count: 0
    };
    return res;
  };
  return getDataArray(total, initFn);
}

// compleDataByDate :: ([a], [b]) -> [c]
export function compleDataByDate(data, arr) {
  return arr.map(item => {
    if (data.length && first(data).date.indexOf(item.date) > -1) {
      return data.shift();
    }
    return item;
  });
}

// grabData :: ([a], Number) -> [a]
export function grabData(data, dividend) {
  const result = [];
  const total = data.length;
  const step = parseInt(total / (dividend - 1), 10);
  for (let i = 0; i < total; i += step) {
    result.push(data[i]);
  }
  return result;
}

// prop :: string -> object[string]
export function prop(key) {
  return obj => obj[key];
}

// addAll :: [] -> any
export function addAll(ary) {
  return reduce(ary, (total, item) => total + item);
}

// 节流函数
export function throttle(fn, interval = 400, firstTime = false) {
  let timer = null;
  let isFirst = firstTime;

  return (...args) => () => {
    if (isFirst) {
      fn.apply(this, args);
      isFirst = false;
      return;
    }

    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      clearInterval(timer);
      timer = null;
    }, interval);

    fn.apply(this, args);
  };
}

export function debounceTime(fn, interval = 500) {
  let timer = null;

  return (...args) => () => {
    clearInterval(timer);
    timer = null;

    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, interval);
    }
  };
}
