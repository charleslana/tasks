import React, { useContext } from 'react';
import ActionEnum from '../enumerations/ActionEnum';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import { TaskContext } from '../contexts/TaskContext';
import { clearTaskService } from '../services/DeleteTaskService';

interface IProps {
  filterTask: (filter: FilterTaskEnum) => void;
  clearTasks: () => void;
}

function FilterTaskComponent(props: IProps): JSX.Element {
  const { tasks, dispatch } = useContext(TaskContext);

  const dispatchClearTask = () => {
    dispatch?.({
      type: ActionEnum.REMOVE_ALL_TASK,
    });
  };

  const handleClickRemoveAllTasks = async () => {
    try {
      await requestClearTasks();
      props.clearTasks();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const requestClearTasks = async () => {
    await clearTaskService()
      .then(() => {
        dispatchClearTask();
      })
      .catch(err => {
        throw new Error(err.message);
      });
  };

  return (
    <>
      <span onClick={() => props.filterTask(FilterTaskEnum.SHOW_ALL)}>
        Todos
      </span>
      |
      <span onClick={() => props.filterTask(FilterTaskEnum.SHOW_ACTIVE)}>
        Ativos
      </span>
      |
      <span onClick={() => props.filterTask(FilterTaskEnum.SHOW_COMPLETED)}>
        Finalizados
      </span>
      <div>
        {tasks.length > 0 ? (
          <button onClick={handleClickRemoveAllTasks}>
            Remover todas as tarefas
          </button>
        ) : null}
      </div>
    </>
  );
}

export default FilterTaskComponent;
