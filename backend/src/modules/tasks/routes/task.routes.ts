import { Joi, Segments, celebrate } from 'celebrate';
import { Router } from 'express';
import TaskController from '../controllers/TaskController';

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
  taskController.arrayCompleted
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

export default taskRoutes;
