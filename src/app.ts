// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

import Koa from 'koa';

// const json = require('koa-json');

import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';


// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app: Koa = new Koa();

// app.use(json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

export default app;
