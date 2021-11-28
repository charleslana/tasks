import TasksController from '../controllers/TasksController';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const taskRoutes = Router();
const taskController = new TasksController();

taskRoutes.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.delete
);

taskRoutes.delete('/', taskController.clear);

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
  '/completed',
  celebrate(
    {
      [Segments.BODY]: {
        idsCompleted: Joi.array()
          .items(Joi.number().required())
          .unique((a, b) => a === b)
          .required(),
      },
    },
    { abortEarly: false }
  ),
  taskController.completedIds
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
  '/completed/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  taskController.completed
);

export default taskRoutes;
