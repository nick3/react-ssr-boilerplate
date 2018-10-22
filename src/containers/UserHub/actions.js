/*
 *
 * UserHub actions
 *
 */

import {
  LOAD_USERINFO,
  LOAD_USERINFO_SUCCESS,
  LOAD_USERINFO_ERROR
} from './constants';

export function loadUserinfo(openId) {
  return {
    type: LOAD_USERINFO,
    openId
  };
}

export function userinfoLoaded(userinfo) {
  return {
    type: LOAD_USERINFO_SUCCESS,
    userinfo
  };
}

export function userinfoLoadError(error) {
  return {
    type: LOAD_USERINFO_ERROR,
    error
  };
}
