import taskRoutes from '../../../../modules/tasks/infra/http/routes/task.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/task', taskRoutes);

export default routes;
