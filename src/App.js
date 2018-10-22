import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserHub from './containers/UserHub/indexNew';
import Helmet from 'react-helmet';
import * as metadata from './metadata';

const App = () => (
  <div className="app">
    <Helmet
      title={metadata.title}
      meta={metadata.meta}
      link={metadata.link}
      script={metadata.script}
      noscript={metadata.noscript}
    />
    <Switch>
      <Route exact path="/" component={UserHub} />
    </Switch>
  </div>
);

export default App;
