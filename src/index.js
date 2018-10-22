import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import App from './App';
import configureStore from './utils/configureStore';

import LanguageProvider from './containers/LanguageProvider';
import { translationMessages } from './i18n';

import 'sanitize.css/sanitize.css';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './styles/index.scss';

window.initClient = () => {
  const store = configureStore(window.__INITIAL_STATE__);
  const MOUNT_NODE = document.getElementById('root');
  const render = messages => {
    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(
        <Provider store={store}>
          <LanguageProvider messages={messages}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </Provider>,
        MOUNT_NODE
      );
    });
  };

  if (module.hot) {
    // Hot reloadable React components and translation json files
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept(['./i18n', './App'], () => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE);
      render(translationMessages);
    });
  }

  // Chunked polyfill for browsers without Intl support
  if (!window.Intl) {
    const langs = [
      import('intl/locale-data/jsonp/en.js'),
      import('intl/locale-data/jsonp/zh.js')
    ];
    new Promise(resolve => {
      resolve(import('intl'));
    })
      .then(() => Promise.all(langs))
      .then(() => render(translationMessages))
      .catch(err => {
        throw err;
      });
  } else {
    render(translationMessages);
  }
};
