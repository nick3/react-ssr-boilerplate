import url from 'url';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import indexHtml from './indexHtml';
import App from '../src/App';
import configureStore from '../src/utils/configureStore';
import fetchDataForRender from './fetchDataForRender';

import LanguageProvider from '../src/containers/LanguageProvider';
import { translationMessages, DEFAULT_LOCALE } from '../src/i18n';
import areIntlLocalesSupported from 'intl-locales-supported';
import { selectQuery } from '../src/utils/generalSelector';
import { http } from '../src/utils/request';

// import 'sanitize.css/sanitize.css';
// import 'weui';
// import 'react-weui/build/packages/react-weui.css';
// import '../src/styles/index.scss';

const appLocales = ['zh', 'en'];

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (!areIntlLocalesSupported(appLocales)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    const IntlPolyfill = require('intl');
    Intl.NumberFormat = IntlPolyfill.NumberFormat;
    Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  global.Intl = require('intl');
}

const renderServerSideApp = (req, res) => {
  const location = url.parse(req.url);
  const query = selectQuery(location);
  const { openid } = query;
  let appState = {};
  if (openid) {
    http.config.openId = openid;
    appState = {
      openId: openid
    };
  }
  var locale = req.acceptsLanguages(appLocales) || DEFAULT_LOCALE;
  const store = configureStore(
    {
      language: {
        locale
      },
      app: appState
    },
    { logger: false }
  );

  fetchDataForRender(req, store).then(() => {
    const context = {};
    const modules = [];

    const markup = ReactDOMServer.renderToString(
      <Loadable.Capture report={moduleName => modules.push(moduleName)}>
        <Provider store={store}>
          <LanguageProvider messages={translationMessages}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </LanguageProvider>
        </Provider>
      </Loadable.Capture>
    );

    const stats = require('../build/react-loadable.json');
    const bundles = getBundles(stats, modules);

    if (context.url) {
      res.redirect(context.url);
    } else {
      const helmet = Helmet.renderStatic();
      const fullMarkup = indexHtml({
        initialState: store.getState(),
        bundles,
        helmet,
        markup
      });

      res.status(200).send(fullMarkup);
    }
  });
};

export default renderServerSideApp;
