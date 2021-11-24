import deleteTaskService from '../services/DeleteTaskService';
import FilterTaskComponent from './FilterTaskComponent';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import FilterTaskReducer from '../reducers/FilterTaskReducer';
import React, { useContext, useEffect, useState } from 'react';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskEnum from '../enumerations/TaskEnum';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { loaderService } from '../../../shared/services/LoaderService';
import { ScrollTop } from 'primereact/scrolltop';
import { TaskContext } from '../contexts/TaskContext';
import updateTaskRequest, {
  arrayCompletedTaskService,
  completedTaskService,
} from '../services/UpdateTaskService';

function TasksListComponent(): JSX.Element {
  const { sortedTasks, dispatch } = useContext(TaskContext);
  const { showLoading, hideLoading } = loaderService();
  const [tasks, setTasks] = useState(sortedTasks);
  const [description, setDescription] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const initialIsCheck: string[] = [];
  const [isCheck, setIsCheck] = useState(initialIsCheck);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [task, setTask] = useState<StateTaskInterface | null>(null);

  useEffect(() => {
    setTasks(sortedTasks);
  }, [sortedTasks]);

  const cancelUpdate = () => {
    setIsShowDialog(false);
    setTask(null);
  };

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
      type: TaskEnum.CHECK_TASK,
      task: {
        created_at: task.created_at,
        completed: task.completed,
        description: task.description,
        id: task.id,
      },
    });
  };

  const dispatchDeleteTask = (id: number) => {
    dispatch?.({
      type: TaskEnum.REMOVE_TASK,
      id: id,
    });
  };

  const dispatchUpdateTask = (task: StateTaskInterface) => {
    dispatch?.({
      type: TaskEnum.UPDATE_TASK,
      task: {
        created_at: task.created_at,
        completed: task.completed,
        description: description,
        id: task.id,
      },
    });
  };

  const handleClickCheck = (e: CheckboxChangeParams) => {
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
    showLoading();
    await arrayCompletedTaskService(ids)
      .then(res => {
        dispatchArrayCompletedTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => hideLoading());
  };

  const requestCompletedTask = async (task: StateTaskInterface) => {
    showLoading();
    await completedTaskService(task)
      .then(res => {
        dispatchCompletedTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => hideLoading());
  };

  const requestDeleteTask = async (id: number) => {
    showLoading();
    await deleteTaskService(id)
      .then(() => {
        dispatchDeleteTask(id);
      })
      .catch(err => {
        throw new Error(err.message);
      })
      .finally(() => hideLoading());
  };

  const requestUpdateTask = async (task: StateTaskInterface) => {
    task.description = description;
    showLoading();
    await updateTaskRequest(task)
      .then(res => {
        dispatchUpdateTask(res);
      })
      .catch(err => {
        throw new Error(err.message);
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
    });
  };

  const showEdit = (task: StateTaskInterface) => {
    setDescription(task.description);
    setTask(task);
    setIsShowDialog(true);
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
      cancelUpdate();
      setDescription('');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const actionsBodyTemplate = (rowData: StateTaskInterface) => {
    return (
      <>
        {!rowData.completed ? (
          <>
            <Button
              icon='pi pi-pencil'
              className='p-button-info m-2'
              label='Editar'
              onClick={() => showEdit(rowData)}
            />
            <Button
              icon='pi pi-check'
              className='p-button-success m-2'
              label='Finalizar'
              onClick={() => showConfirmDialog(() => handleFinish(rowData))}
            />
          </>
        ) : null}
        {task?.id !== rowData.id ? (
          <Button
            icon='pi pi-times'
            className='p-button-danger m-2'
            label='Excluir'
            onClick={() =>
              showConfirmDialog(() => handleClickDelete(rowData.id))
            }
          />
        ) : null}
      </>
    );
  };

  const checkboxBodyTemplate = (rowData: StateTaskInterface) => {
    return (
      <>
        {!rowData.completed ? (
          <Checkbox
            id={rowData.id.toString()}
            onChange={handleClickCheck}
            checked={isCheck.includes(rowData.id.toString())}
          ></Checkbox>
        ) : null}
      </>
    );
  };

  const dateBodyTemplate = (rowData: StateTaskInterface) => {
    return new Date(rowData.created_at).toLocaleDateString();
  };

  const statusBodyTemplate = (rowData: StateTaskInterface) => {
    return (
      <>
        {rowData.completed ? (
          <Badge value='Finalizado' severity='success'></Badge>
        ) : (
          <Badge value='Ativo' severity='info'></Badge>
        )}
      </>
    );
  };

  return (
    <>
      <Dialog
        header={task?.description}
        visible={isShowDialog}
        onHide={() => cancelUpdate()}
        breakpoints={{ '960px': '75vw' }}
        className='dialog-size'
        draggable={false}
        footer={
          <Button
            label='Cancelar'
            icon='pi pi-times'
            onClick={() => cancelUpdate()}
            className='p-button-text'
          />
        }
      >
        {task ? (
          <form onSubmit={e => submitUpdate(e, task)}>
            <div className='formgroup-inline'>
              <div className='field'>
                <label>Descrição *</label>
                <InputText
                  id='editDescription'
                  autoFocus
                  maxLength={255}
                  autoComplete='off'
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <Button
                icon='pi pi-pencil'
                className='p-button-info'
                label='Atualizar'
              />
            </div>
          </form>
        ) : null}
      </Dialog>
      <FilterTaskComponent filterTask={filterTask} clearTasks={clearTasks} />
      <div className='card'>
        <DataTable
          className='fadeinleft animation-duration-500'
          value={tasks}
          responsiveLayout='scroll'
          emptyMessage='Nenhuma tarefa foi encontrada.'
          paginator
          rows={10}
        >
          <Column header='' body={checkboxBodyTemplate}></Column>
          <Column field='description' header='Tarefas' sortable></Column>
          <Column
            field='created_at'
            header='Data'
            body={dateBodyTemplate}
            sortable
          ></Column>
          <Column
            field='completed'
            header='Status'
            body={statusBodyTemplate}
            sortable
          ></Column>
          <Column header='Ações' body={actionsBodyTemplate}></Column>
        </DataTable>
        <ScrollTop />
      </div>
      {tasks && tasks.length > 0 ? (
        tasks.filter(task => !task.completed).length !== isCheck.length &&
        tasks.filter(task => !task.completed).length ? (
          <Button
            icon='pi pi-list'
            className='p-button-warning m-2 fadein animation-duration-500'
            label='Selecionar todas'
            onClick={handleClickSelectAll}
          />
        ) : (
          tasks.filter(task => !task.completed).length === 0 || (
            <Button
              icon='pi pi-list'
              className='m-2 fadein animation-duration-500'
              label='Desmarcar todas'
              onClick={() => setIsCheck([])}
            />
          )
        )
      ) : null}
      {tasks?.length === 0 || isCheck.length === 0 ? null : (
        <Button
          icon='pi pi-check'
          className='p-button-success m-2 fadein animation-duration-500'
          label='Finalizar selecionadas'
          onClick={() => showConfirmDialog(handleFinishAll)}
        />
      )}
    </>
  );
}

export default TasksListComponent;
