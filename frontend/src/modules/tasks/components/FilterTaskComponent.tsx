import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import React, { useContext, useState } from 'react';
import TaskEnum from '../enumerations/TaskEnum';
import { Button } from 'primereact/button';
import { clearTaskService } from '../services/DeleteTaskService';
import { confirmDialog } from 'primereact/confirmdialog';
import { loaderService } from '../../../shared/services/LoaderService';
import { TabMenu } from 'primereact/tabmenu';
import { TaskContext } from '../contexts/TaskContext';

interface IProps {
  filterTask: (filter: FilterTaskEnum) => void;
  clearTasks: () => void;
}

function FilterTaskComponent(props: IProps): JSX.Element {
  const { tasks, dispatch } = useContext(TaskContext);
  const { showLoading, hideLoading } = loaderService();
  const [activeIndex, setActiveIndex] = useState(0);

  const showConfirmDialog = (onClick: () => void) => {
    confirmDialog({
      message: 'Tem certeza de que deseja continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: onClick,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
    });
  };

  const dispatchClearTask = () => {
    dispatch?.({
      type: TaskEnum.REMOVE_ALL_TASK,
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
    showLoading();
    await clearTaskService()
      .then(() => {
        dispatchClearTask();
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => hideLoading());
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
        <div className='col-12 md:col-9 lg:col-9'>
          <TabMenu
            model={tabItems}
            activeIndex={activeIndex}
            onTabChange={e => setActiveIndex(e.index)}
          />
        </div>
        <div className='col-12 md:col-3 lg:col-3'>
          {tasks && tasks.length > 0 ? (
            <Button
              icon='pi pi-times'
              className='p-button-danger'
              label='Remover todas as tarefas'
              onClick={() => showConfirmDialog(handleClickRemoveAllTasks)}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default FilterTaskComponent;
