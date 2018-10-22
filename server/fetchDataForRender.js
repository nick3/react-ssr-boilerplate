import url from 'url';
import { matchPath } from 'react-router-dom';
import UserHub from '../src/containers/UserHub/indexNew';
import { selectQuery } from '../src/utils/generalSelector';

const ROUTES_THAT_FETCH_DATA = [
  {
    path: '/',
    component: UserHub,
    exact: true
  }
];

const fetchDataForRender = (req, store) => {
  const promises = [];

  ROUTES_THAT_FETCH_DATA.some(route => {
    const location = url.parse(req.url);
    const match = matchPath(location.pathname, route);
    if (match) {
      const query = selectQuery(location);
      const promise =
        route.component &&
        route.component.fetchData &&
        route.component.fetchData(store, query.openid);
      promises.push(promise);
    }
    return match;
  });

  return Promise.all(promises);
};

export default fetchDataForRender;
