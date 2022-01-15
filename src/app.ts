// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

import Koa from 'koa';
import { createConnection } from "typeorm";
import { IMessage, MyLogger } from './logger';

// const json = require('koa-json');

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';

createConnection({
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'admin',
  password: '123456',
  database: 'rsschool-service-db',
  synchronize: true,
  entities: ['src/resources/tasks/task.model.ts', 'src/resources/boards/board.model.ts'],
})
  .then(() => {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');
})
  .catch(error => console.log(error));

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app: Koa = new Koa();

const logger = new MyLogger(true, true, true);


// app.use(json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use(async (ctx, next) => {
  await next();

  const message: IMessage = { status: ctx.status, executeTime: ctx.response.get('X-Response-Time')};

  message.params = JSON.stringify(ctx.params);
  message.body = JSON.stringify(ctx.body);
  message.query = JSON.stringify(ctx.query);
  message.method = ctx.request.method
  message.url = ctx.request.url
  message.message = ctx.response.message

  logger.logResult(message);
});


app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

const handleException = (err: Error) => {
  const message: IMessage = { status: 500 };
  message.message = `Uncaught Exception Error: ${err.message}`;

  logger.logResult(message);

  process.exit(1);
};

const handleRejectedPromise = (err: Error) => {
  const message: IMessage = { status: 500 };
  message.message = `Unhandled Rejection Error: ${err.message}`;

  logger.logResult(message);

  process.exit(1);
};

(() => {
  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
})();

// throw Error('Oops!');
// Promise.reject(Error('Oops!'));


export default app;
