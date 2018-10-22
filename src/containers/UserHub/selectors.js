import { createSelector } from 'reselect';

/**
 * Direct selector to the userHub state domain
 */
const selectUserHubDomain = () => state => state.get('userHub');

/**
 * Default selector used by UserHub
 */

const selectUserHub = () =>
  createSelector(selectUserHubDomain(), substate => substate.toJS());

export default selectUserHub;
export { selectUserHubDomain };
