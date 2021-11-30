// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');

const Koa = require('koa');
const KoaRouter = require('koa-router');
const json = require('koa-json');
const taskRouter = require('./resources/tasks/task.router');
const userRouter = require('./resources/users/user.router');




// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));


const app = new Koa();
const router = new KoaRouter();

app.use(json());

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


app.use(userRouter.routes()).use(router.allowedMethods());
app.use(taskRouter.routes()).use(router.allowedMethods());

module.exports = app;
