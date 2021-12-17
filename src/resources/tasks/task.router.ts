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
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = await tasksService.createTask(ctx.params.boardId, jsonData);

    ctx.status = user.code;
    ctx.body = user.message;

  });
});

router.put('/boards/:boardId/tasks/:id', async (ctx) => {
  ctx.req.on('data', async (data) => {
    const jsonData = JSON.parse(data);
    const user = await tasksService.updateTask(ctx.params.boardId, ctx.params.id, jsonData);

    ctx.status = user.code;
    ctx.body = user.message;
  });
})

router.delete('/boards/:boardId/tasks/:id', async (ctx) => {
  const result = tasksService.deleteUser(ctx.params.boardId, ctx.params.id);

  ctx.status = result.code;
  ctx.body = result.message;
})


export default router;
