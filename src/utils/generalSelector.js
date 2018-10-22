import queryString from 'query-string';
import { createSelector } from 'reselect';

export const selectQuery = location => {
  const query = queryString.parse(location.search);
  return query;
};

export const querySelector = (state, props) => {
  const { location = {} } = props;
  return selectQuery(location);
};

export const selectAppState = state => state.get('app');
export const openIdSelector = createSelector(selectAppState, app =>
  app.get('openId')
);
