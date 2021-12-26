// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

import Koa from 'koa';
import MyLogger from './logger'

// const json = require('koa-json');

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';


// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app: Koa = new Koa();

const logger = new MyLogger(2, true, true);


// app.use(json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');

  logger.logResult(ctx, rt);

  // console.log(`${ctx.method} ${ctx.url} ${ctx.response.status} ${a} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());


export default app;
