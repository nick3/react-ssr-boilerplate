import { createSelector } from 'reselect';

// SELECTORS
// ================================================

const selectApp = state => {
  const app = state.get('app');
  return app;
};
const selectOpenId = () =>
  createSelector(selectApp, appState => appState.get('openId'));

export { selectApp, selectOpenId };
