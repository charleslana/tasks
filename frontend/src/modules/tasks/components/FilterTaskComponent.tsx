import React, { useContext, useState } from 'react';
import ActionEnum from '../enumerations/ActionEnum';
import { Button } from 'primereact/button';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import { TabMenu } from 'primereact/tabmenu';
import { TaskContext } from '../contexts/TaskContext';
import { clearTaskService } from '../services/DeleteTaskService';

interface IProps {
  filterTask: (filter: FilterTaskEnum) => void;
  clearTasks: () => void;
}

function FilterTaskComponent(props: IProps): JSX.Element {
  const { tasks, dispatch } = useContext(TaskContext);
  const [activeIndex, setActiveIndex] = useState(0);

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

  const tabItems = [
    {
      label: 'Todos',
      command: () => props.filterTask(FilterTaskEnum.SHOW_ALL),
    },
    {
      label: 'Ativos',
      command: () => props.filterTask(FilterTaskEnum.SHOW_ACTIVE),
    },
    {
      label: 'Finalizados',
      command: () => props.filterTask(FilterTaskEnum.SHOW_COMPLETED),
    },
  ];

  return (
    <>
      <div className='grid justify-content-center mb-2'>
        <div className='col-12 md:col-6 lg:col-6'>
          <TabMenu
            model={tabItems}
            activeIndex={activeIndex}
            onTabChange={e => setActiveIndex(e.index)}
          />
        </div>
        <div className='col-12 md:col-6 lg:col-6'>
          {tasks.length > 0 ? (
            <Button
              icon='pi pi-times'
              className='p-button-danger'
              label='Remover todas as tarefas'
              onClick={handleClickRemoveAllTasks}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FilterTaskComponent;
