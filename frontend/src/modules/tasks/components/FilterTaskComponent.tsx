import React, { useContext } from 'react';
import ActionEnum from '../../../shared/enumerations/ActionEnum';
import FilterTaskEnum from '../../../shared/enumerations/FilterTaskEnum';
import { TaskContext } from '../../../shared/contexts/TaskContext';

interface IProps {
  filterTask: (filter: FilterTaskEnum) => void;
}

function FilterTaskComponent(props: IProps): JSX.Element {
  const { tasks, dispatch } = useContext(TaskContext);

  const handleClickRemoveAllTasks = () => {
    dispatch?.({
      type: ActionEnum.REMOVE_ALL_TASK,
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
