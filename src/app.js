// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

const Koa = require('koa');
const json = require('koa-json');
// const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');


// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = new Koa();

app.use(json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(boardRouter.routes()).use(boardRouter.allowedMethods());
app.use(taskRouter.routes()).use(taskRouter.allowedMethods());

module.exports = app;
