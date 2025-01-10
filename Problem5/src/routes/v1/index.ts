import express from 'express';
import docsRoute from './docs.route';
import config from '../../config/config';
import todoRoute from './todo.route';

const router = express.Router();

interface Route {
  path: string;
  route: express.Router;
}

const defaultRoutes: Route[] = [
  {
    path: '/todos',
    route: todoRoute,
  },
];

const devRoutes: Route[] = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router; 