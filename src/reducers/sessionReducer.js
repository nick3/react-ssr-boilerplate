import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

const user = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        ...action.session.user
      };

    case 'DESTROY_SESSION':
      return state;

    default:
      return state;
  }
};

const session = combineReducers({
  user
});

export default session;

// SELECTORS
// ================================================

const selectSession = state => {
  const session = state.get('session');
  return session;
};
const selectCurrentUser = () =>
  createSelector(selectSession, sessionState => sessionState.user);

export { selectSession, selectCurrentUser };
