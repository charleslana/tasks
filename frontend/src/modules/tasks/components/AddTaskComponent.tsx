import addTaskRequest from '../services/CreateTaskService';
import FormTaskInterface from '../interfaces/FormTaskInterface';
import getTasksRequest from '../services/ListTaskService';
import React, { useContext, useEffect } from 'react';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskEnum from '../enumerations/TaskEnum';
import { alertService } from '../../../shared/services/AlertService';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { FormikErrors, useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { loaderService } from '../../../shared/services/LoaderService';
import { TaskContext } from '../contexts/TaskContext';
import { toastService } from '../../../shared/services/ToastService';

function AddTaskComponent(): JSX.Element {
  const { dispatch, tasks } = useContext(TaskContext);
  const { showLoading, hideLoading } = loaderService();
  const { showToast } = toastService();
  const { showAlert } = alertService();
  const initialValues: FormTaskInterface = { description: '' };

  useEffect(() => {
    getAllTasks();
  }, [getTasksRequest]);

  const checkExist = () => {
    const existTask = tasks?.some(
      task =>
        task.description.toLowerCase() ===
        formik.values.description.toLowerCase().trim()
    );
    if (existTask) {
      throw new Error('Já existe uma tarefa com a mesma descrição.');
    }
  };

  const dispatchAddAllTask = (res: StateTaskInterface[]) => {
    dispatch?.({
      type: TaskEnum.REMOVE_ALL_TASK,
    });
    res.forEach(element => {
      dispatch?.({
        type: TaskEnum.ADD_TASK,
        task: {
          created_at: element.created_at,
          completed: element.completed,
          description: element.description,
          id: element.id,
        },
      });
    });
  };

  const dispatchAddTask = (task: StateTaskInterface) => {
    dispatch?.({
      type: TaskEnum.ADD_TASK,
      task: {
        created_at: task.created_at,
        completed: task.completed,
        description: task.description,
        id: task.id,
      },
    });
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (data: FormTaskInterface) => {
      const errors: FormikErrors<FormTaskInterface> = {};
      if (!data.description.trim()) {
        errors.description = 'O campo da descrição é obrigatório.';
      }
      return errors;
    },
    onSubmit: () => submitAddTask(),
  });

  const getAllTasks = async () => {
    showLoading();
    await getTasksRequest()
      .then(res => {
        dispatchAddAllTask(res);
      })
      .catch(err => {
        showAlert(err.message);
      })
      .finally(() => hideLoading());
  };

  const getFormErrorMessage = () => {
    return (
      isFormFieldValid() && (
        <div className='text-right'>
          <small className='p-error'>{formik.errors.description}</small>
        </div>
      )
    );
  };

  const isFormFieldValid = () =>
    !!(formik.touched.description && formik.errors.description);

  const requestAddTask = async (description: string) => {
    showLoading();
    await addTaskRequest(description)
      .then(res => {
        dispatchAddTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => hideLoading());
  };

  const submitAddTask = async () => {
    try {
      checkExist();
      await requestAddTask(formik.values.description);
      formik.resetForm();
      showToast('success', 'Tarefa criada com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
      }
    }
  };

  return (
    <>
      <div className='grid justify-content-center mb-2'>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas totais <Badge value={tasks?.length.toString()}></Badge>
          </h4>
        </div>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas ativas{' '}
            <Badge
              value={tasks?.filter(task => !task.completed).length.toString()}
            ></Badge>
          </h4>
        </div>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas finalizadas{' '}
            <Badge
              value={tasks?.filter(task => task.completed).length.toString()}
            ></Badge>
          </h4>
        </div>
      </div>
      <div className='grid justify-content-center mb-2'>
        <div className='col-12 md:col-9 lg:col-6'>
          <form onSubmit={formik.handleSubmit}>
            <div className='formgroup-inline'>
              <div className='field'>
                <label
                  htmlFor='description'
                  className={classNames({
                    'p-error': isFormFieldValid(),
                  })}
                >
                  Descrição *
                </label>
                <InputText
                  id='description'
                  maxLength={255}
                  autoComplete='off'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid(),
                  })}
                />
                {getFormErrorMessage()}
              </div>
              <Button
                type='submit'
                icon='pi pi-plus'
                className='p-button-success mt-1'
                label='Cadastrar'
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskComponent;
