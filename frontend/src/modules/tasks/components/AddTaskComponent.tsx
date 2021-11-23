import React, { useContext, useEffect, useState } from 'react';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import { TaskContext } from '../contexts/TaskContext';
import TaskEnum from '../enumerations/TaskEnum';
import addTaskRequest from '../services/CreateTaskService';
import getTasksRequest from '../services/ListTaskService';
import { loaderService } from '../../../shared/services/LoaderService';

function AddTaskComponent(): JSX.Element {
  const { dispatch, tasks } = useContext(TaskContext);
  const { showLoading, hideLoading } = loaderService();
  const [description, setDescription] = useState('');

  useEffect(() => {
    getAllTasks();
  }, [getTasksRequest]);

  const getAllTasks = async () => {
    showLoading();
    await getTasksRequest()
      .then(res => {
        dispatchAddAllTask(res);
      })
      .catch(err => {
        alert(err.message);
      })
      .finally(() => hideLoading());
  };

  const checkExist = () => {
    const existTask = tasks.some(
      task =>
        task.description.toLowerCase() === description.toLowerCase().trim()
    );
    if (existTask) {
      throw new Error('Já existe uma tarefa com a mesma descrição.');
    }
  };

  const checkIsNotEmpty = (value: string) => {
    if (!value.trim()) {
      throw new Error('Preencha o campo da descrição.');
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
          id: element.id,
          description: element.description,
          completed: element.completed,
        },
      });
    });
  };

  const dispatchAddTask = (task: StateTaskInterface) => {
    dispatch?.({
      type: TaskEnum.ADD_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
      },
    });
  };

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

  const submitAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      checkIsNotEmpty(description);
      checkExist();
      await requestAddTask(description);
      setDescription('');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <div className='grid justify-content-center mb-2'>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas totais <Badge value={tasks.length.toString()}></Badge>
          </h4>
        </div>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas ativas{' '}
            <Badge
              value={tasks.filter(task => !task.completed).length.toString()}
            ></Badge>
          </h4>
        </div>
        <div className='col-12 md:col-6 lg:col-3'>
          <h4>
            Tarefas finalizadas{' '}
            <Badge
              value={tasks.filter(task => task.completed).length.toString()}
            ></Badge>
          </h4>
        </div>
      </div>
      <div className='grid justify-content-center mb-2'>
        <div className='col-12 md:col-9 lg:col-6'>
          <form onSubmit={submitAddTask}>
            <div className='formgroup-inline'>
              <div className='field'>
                <label>Descrição</label>
                <InputText
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <Button
                icon='pi pi-plus'
                className='p-button-success'
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
