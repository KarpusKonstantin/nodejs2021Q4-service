import Router from 'koa-router';
import tasksService from './task.service';

const router = new Router();


router.get('/boards/:boardId/tasks', async (ctx) => {
  const users = await tasksService.getAllTaskByBoardId(ctx.params.boardId);

  ctx.status = users.code;
  ctx.body = users.message;
});

router.get('/boards/:boardId/tasks/:id', async (ctx) => {
  const users = await tasksService.getTaskByBoardIdAndTaskId(ctx.params.boardId, ctx.params.id);

  ctx.status = users.code;
  ctx.body = users.message;
});

router.post('/boards/:boardId/tasks', async (ctx) => {
  const { body } = ctx.request;
  const task = await tasksService.createTask(ctx.params.boardId, body);

  ctx.status = task.code;
  ctx.body = task.message;
});

router.put('/boards/:boardId/tasks/:id', async (ctx) => {
  const { body } = ctx.request;
  const task = await tasksService.updateTask(ctx.params.boardId, ctx.params.id, body);

  ctx.status = task.code;
  ctx.body = task.message;
})

router.delete('/boards/:boardId/tasks/:id', async (ctx) => {
  const result = await tasksService.deleteUser(ctx.params.boardId, ctx.params.id);

  ctx.status = result.code;
  ctx.body = result.message;
})


export default router;
