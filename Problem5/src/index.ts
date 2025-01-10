import { AppDataSource } from './config/typeorm.config';
import app from './app';
import config from './config/config';
import logger from './config/logger';

let server: any;

const bootstrap = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Connected to PostgreSQL');

    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
      logger.info(`Swagger UI: http://localhost:${config.port}/v1/docs`);
    });
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL', error);
  }
};

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

bootstrap(); 