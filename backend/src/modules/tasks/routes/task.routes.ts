import { Router } from 'express';
import TaskController from '../controllers/TaskController';
import { celebrate, Joi, Segments } from 'celebrate';

const taskRoutes = Router();
const taskController = new TaskController();

taskRoutes.get('/', taskController.index);

taskRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.show
);

taskRoutes.post(
  '/',
  celebrate(
    {
      [Segments.BODY]: {
        description: Joi.string().trim().min(1).max(255).required(),
      },
    },
    { abortEarly: false }
  ),
  taskController.create
);

taskRoutes.put(
  '/:id',
  celebrate(
    {
      [Segments.PARAMS]: {
        id: Joi.number().required(),
      },
      [Segments.BODY]: {
        description: Joi.string().trim().min(1).max(255).required(),
      },
    },
    { abortEarly: false }
  ),
  taskController.update
);

taskRoutes.put(
  '/status/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.status
);

taskRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.delete
);

export default taskRoutes;
