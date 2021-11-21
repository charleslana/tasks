import React, { useContext, useEffect, useRef, useState } from 'react';
import ActionEnum from '../../../shared/enumerations/ActionEnum';
import StateTaskInterface from '../../../shared/interfaces/StateTaskInterface';
import { TaskContext } from '../../../shared/contexts/TaskContext';
import addTasksRequest from '../services/CreateTaskService';
import getTasksRequest from '../services/ListTaskService';

function AddTaskComponent(): JSX.Element {
  const { dispatch, tasks } = useContext(TaskContext);
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTasksRequest()
      .then(res => {
        dispatchAddAllTask(res);
      })
      .catch(err => {
        alert(err.message);
      });
    inputRef.current?.focus();
  }, [getTasksRequest]);

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
      type: ActionEnum.REMOVE_ALL_TASK,
    });
    res.forEach(element => {
      dispatch?.({
        type: ActionEnum.ADD_TASK,
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
      type: ActionEnum.ADD_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
      },
    });
  };

  const requestAddTask = async (description: string) => {
    await addTasksRequest(description)
      .then(res => {
        dispatchAddTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      });
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
      <h1>Minha lista de tarefas</h1>
      <div>Tarefas total: {tasks.length}</div>
      <div>Tarefas ativas: {tasks.filter(task => task.completed).length}</div>
      <div>
        Tarefas finalizadas: {tasks.filter(task => !task.completed).length}
      </div>
      <form onSubmit={submitAddTask}>
        <input
          ref={inputRef}
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
        <button>Adicionar</button>
      </form>
    </>
  );
}

export default AddTaskComponent;
