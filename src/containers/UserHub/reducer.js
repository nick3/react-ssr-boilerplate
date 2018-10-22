/*
 *
 * UserHub reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_USERINFO,
  LOAD_USERINFO_SUCCESS,
  LOAD_USERINFO_ERROR
} from './constants';

const initialState = fromJS({});

function userHubReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERINFO:
      return state
        .set('loading', true)
        .set('error', false)
        .set('userinfo', {});
    case LOAD_USERINFO_SUCCESS:
      return state.set('loading', false).set('userinfo', action.userinfo);
    case LOAD_USERINFO_ERROR:
      return state.set('loading', false).set('error', true);
    default:
      return state;
  }
}

export default userHubReducer;
