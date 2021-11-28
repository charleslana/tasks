import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import IPropsFilterTask from '../models/IPropsFilterTask';
import React, { useState } from 'react';
import { alertService } from '../../../shared/services/AlertService';
import { Button } from 'primereact/button';
import { clearTaskService } from '../services/DeleteTaskService';
import { confirmDialog } from 'primereact/confirmdialog';
import { loaderService } from '../../../shared/services/LoaderService';
import { TabMenu } from 'primereact/tabmenu';
import { taskService } from '../services/TaskService';
import { toastService } from '../../../shared/services/ToastService';

function FilterTaskComponent(props: IPropsFilterTask): JSX.Element {
  const { tasks, removeAllTask } = taskService();
  const { showLoading, hideLoading } = loaderService();
  const { showToast } = toastService();
  const { showAlert } = alertService();
  const [activeIndex, setActiveIndex] = useState(0);

  const dispatchClearTask = () => {
    removeAllTask();
  };

  const handleClickRemoveAllTasks = async () => {
    try {
      await requestClearTasks();
      props.clearTasks();
      showToast('success', 'Tarefa(s) excluída com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
      }
    }
  };

  const requestClearTasks = async () => {
    showLoading();
    await clearTaskService()
      .then(() => {
        dispatchClearTask();
      })
      .catch(error => {
        throw new Error(error.message);
      })
      .finally(() => hideLoading());
  };

  const showConfirmDialog = (onClick: () => void) => {
    confirmDialog({
      message: 'Tem certeza de que deseja continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: onClick,
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      draggable: false,
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
              id='btnRemoveAllTasks'
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
