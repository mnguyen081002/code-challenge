import pkg = require('../../package.json');
const { version } = pkg;
import config from '../config/config';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef; 