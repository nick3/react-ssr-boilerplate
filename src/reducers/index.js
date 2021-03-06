/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';

import languageProviderReducer from '../containers/LanguageProvider/reducer';
import session from './sessionReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    session,
    language: languageProviderReducer,
    ...injectedReducers
  });
}
