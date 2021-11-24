import taskRoutes from '../../../modules/tasks/routes/task.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/task', taskRoutes);

export default routes;
