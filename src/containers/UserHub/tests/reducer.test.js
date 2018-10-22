import { fromJS } from 'immutable';
import userHubReducer from '../reducer';

describe('userHubReducer', () => {
  it('returns the initial state', () => {
    expect(userHubReducer(undefined, {})).toEqual(fromJS({}));
  });
});
