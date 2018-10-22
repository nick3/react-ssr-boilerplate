const prodConfig = require('./config.prod');
const devConfig = require('./config.dev');

switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = prodConfig;
    break;
  default:
    module.exports = devConfig;
    break;
}
