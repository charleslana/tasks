import React, { useContext, useEffect, useState } from 'react';
import updateTaskRequest, {
  arrayCompletedTaskService,
  completedTaskService,
} from '../services/UpdateTaskService';
import ActionEnum from '../enumerations/ActionEnum';
import FilterTaskComponent from './FilterTaskComponent';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import FilterTaskReducer from '../reducers/FilterTaskReducer';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import { TaskContext } from '../contexts/TaskContext';
import deleteTaskService from '../services/DeleteTaskService';

function TasksListComponent(): JSX.Element {
  const { sortedTasks, dispatch } = useContext(TaskContext);
  const [tasks, setTasks] = useState(sortedTasks);
  const [id, setId] = useState(0);
  const [description, setDescription] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const initialIsCheck: string[] = [];
  const [isCheck, setIsCheck] = useState(initialIsCheck);

  useEffect(() => {
    setTasks(sortedTasks);
  }, [sortedTasks]);

  const checkExist = (task: StateTaskInterface) => {
    const existTask = tasks?.some(
      item =>
        item.description.toLowerCase() === description.toLowerCase().trim() &&
        item.id !== task.id
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

  const clearTasks = () => {
    setIsCheck([]);
  };

  const dispatchArrayCompletedTask = (tasks: StateTaskInterface[]) => {
    isCheck.forEach(id => {
      const taskIndex = tasks.findIndex(
        (task: StateTaskInterface) => task.id === parseInt(id)
      );
      dispatchCompletedTask(tasks[taskIndex]);
    });
  };

  const dispatchCompletedTask = (task: StateTaskInterface) => {
    dispatch?.({
      type: ActionEnum.CHECK_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
      },
    });
  };

  const dispatchDeleteTask = (id: number) => {
    dispatch?.({
      type: ActionEnum.REMOVE_TASK,
      id: id,
    });
  };

  const dispatchUpdateTask = (task: StateTaskInterface) => {
    dispatch?.({
      type: ActionEnum.UPDATE_TASK,
      task: {
        id: task.id,
        description: description,
        completed: task.completed,
      },
    });
  };

  const handleClickCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  const handleClickDelete = async (id: number) => {
    try {
      await requestDeleteTask(id);
      setIsCheck(isCheck.filter(item => item !== id.toString()));
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleFinish = async (task: StateTaskInterface) => {
    try {
      await requestCompletedTask(task);
      setIsCheck(isCheck.filter(item => item !== task.id.toString()));
      setId(0);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleFinishAll = async () => {
    try {
      await requestArrayCompletedTask(isCheck.map(i => Number(i)));
      setIsCheck([]);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleClickSelectAll = () => {
    const isCompleted = sortedTasks?.filter(task => !task.completed);
    if (isCompleted) {
      if (isCompleted.length > 0) {
        setIsCheckAll(!isCheckAll);
        const stateTasks = tasks
          ?.filter(task => !task.completed)
          .map(task => task.id.toString());
        if (stateTasks) {
          setIsCheck(stateTasks);
        }
      }
    }
  };

  const filterTask = (type: FilterTaskEnum) => {
    if (sortedTasks) {
      const filteredTask = FilterTaskReducer(sortedTasks, type);
      setTasks(filteredTask);
    }
  };

  const requestArrayCompletedTask = async (ids: number[]) => {
    await arrayCompletedTaskService(ids)
      .then(res => {
        dispatchArrayCompletedTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  const requestCompletedTask = async (task: StateTaskInterface) => {
    await completedTaskService(task)
      .then(res => {
        dispatchCompletedTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  const requestDeleteTask = async (id: number) => {
    await deleteTaskService(id)
      .then(() => {
        dispatchDeleteTask(id);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  const requestUpdateTask = async (task: StateTaskInterface) => {
    task.description = description;
    await updateTaskRequest(task)
      .then(res => {
        dispatchUpdateTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  const showEdit = (task: StateTaskInterface) => {
    setDescription(task.description);
    setId(task.id);
  };

  const submitUpdate = async (
    e: React.FormEvent<HTMLFormElement>,
    task: StateTaskInterface
  ) => {
    e.preventDefault();
    try {
      checkIsNotEmpty(description);
      checkExist(task);
      await requestUpdateTask(task);
      setId(0);
      setDescription('');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <FilterTaskComponent filterTask={filterTask} clearTasks={clearTasks} />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Tarefa</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((task: StateTaskInterface) => (
            <tr key={task.id}>
              <td>
                {!task.completed ? (
                  <input
                    type='checkbox'
                    id={task.id.toString()}
                    onChange={handleClickCheck}
                    checked={isCheck.includes(task.id.toString())}
                  />
                ) : null}
              </td>
              <td>
                {id === task.id ? (
                  <>
                    <form onSubmit={e => submitUpdate(e, task)}>
                      <input
                        autoFocus
                        value={description}
                        onChange={e => {
                          setDescription(e.target.value);
                        }}
                      />
                      <button>Atualizar</button>
                    </form>
                    <button onClick={() => setId(0)}>Cancelar</button>
                  </>
                ) : (
                  task.description
                )}
              </td>
              <td>{task.completed ? 'Finalizado' : 'Ativo'}</td>
              <td>
                {!task.completed ? (
                  <>
                    <button onClick={() => showEdit(task)}>Editar</button>
                    <button onClick={() => handleFinish(task)}>
                      Finalizar
                    </button>
                  </>
                ) : null}
                {id !== task.id ? (
                  <button onClick={() => handleClickDelete(task.id)}>
                    Excluir
                  </button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {tasks && tasks.length > 0 ? (
        tasks.filter(task => !task.completed).length !== isCheck.length &&
        tasks.filter(task => !task.completed).length ? (
          <button onClick={handleClickSelectAll}>Selecionar todas</button>
        ) : (
          tasks.filter(task => !task.completed).length === 0 || (
            <button onClick={() => setIsCheck([])}>Desmarcar todas</button>
          )
        )
      ) : null}
      {tasks?.length === 0 || isCheck.length === 0 ? null : (
        <button onClick={handleFinishAll}>Finalizar selecionadas</button>
      )}
    </>
  );
}

export default TasksListComponent;
