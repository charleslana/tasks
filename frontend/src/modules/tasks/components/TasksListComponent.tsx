import deleteTaskService from '../services/DeleteTaskService';
import FilterTaskComponent from './FilterTaskComponent';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import FilterTaskReducer from '../reducers/FilterTaskReducer';
import FormUpdateTaskInterface from '../interfaces/FormUpdateTaskInterface';
import React, { useContext, useEffect, useState } from 'react';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import TaskEnum from '../enumerations/TaskEnum';
import { alertService } from '../../../shared/services/AlertService';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';
import { Column } from 'primereact/column';
import { confirmDialog } from 'primereact/confirmdialog';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FormikErrors, useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { loaderService } from '../../../shared/services/LoaderService';
import { ScrollTop } from 'primereact/scrolltop';
import { TaskContext } from '../contexts/TaskContext';
import { toastService } from '../../../shared/services/ToastService';
import updateTaskRequest, {
  arrayCompletedTaskService,
  completedTaskService,
} from '../services/UpdateTaskService';

function TasksListComponent(): JSX.Element {
  const { sortedTasks, dispatch } = useContext(TaskContext);
  const { showLoading, hideLoading } = loaderService();
  const { showToast } = toastService();
  const { showAlert } = alertService();
  const [tasks, setTasks] = useState(sortedTasks);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const initialIsCheck: string[] = [];
  const [isCheck, setIsCheck] = useState(initialIsCheck);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [task, setTask] = useState<StateTaskInterface | null>(null);
  const initialValues: FormUpdateTaskInterface = { editDescription: '' };

  useEffect(() => {
    setTasks(sortedTasks);
  }, [sortedTasks]);

  const cancelUpdate = () => {
    setIsShowDialog(false);
    setTask(null);
    formik.resetForm();
  };

  const checkExist = (task: StateTaskInterface) => {
    const existTask = tasks?.some(
      item =>
        item.description.toLowerCase() ===
          formik.values.editDescription.toLowerCase().trim() &&
        item.id !== task.id
    );
    if (existTask) {
      throw new Error('Já existe uma tarefa com a mesma descrição.');
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
        description: formik.values.editDescription.trim(),
        id: task.id,
      },
    });
  };

  const filterTask = (type: FilterTaskEnum) => {
    if (sortedTasks) {
      const filteredTask = FilterTaskReducer(sortedTasks, type);
      setTasks(filteredTask);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validate: (data: FormUpdateTaskInterface) => {
      const errors: FormikErrors<FormUpdateTaskInterface> = {};
      if (!data.editDescription.trim()) {
        errors.editDescription = 'O campo da descrição é obrigatório.';
      }
      return errors;
    },
    onSubmit: () => {
      if (task) {
        submitUpdate(task);
      }
    },
  });

  const getFormErrorMessage = () => {
    return (
      isFormFieldValid() && (
        <div className='text-right'>
          <small className='p-error'>{formik.errors.editDescription}</small>
        </div>
      )
    );
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
      showToast('success', 'Tarefa excluída com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
      }
    }
  };

  const handleFinish = async (task: StateTaskInterface) => {
    try {
      await requestCompletedTask(task);
      setIsCheck(isCheck.filter(item => item !== task.id.toString()));
      showToast('success', 'Tarefa finalizada com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
      }
    }
  };

  const handleFinishAll = async () => {
    try {
      await requestArrayCompletedTask(isCheck.map(i => Number(i)));
      setIsCheck([]);
      showToast('success', 'Tarefa(s) finalizada com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
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

  const isFormFieldValid = () =>
    !!(formik.touched.editDescription && formik.errors.editDescription);

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
    task.description = formik.values.editDescription.trim();
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
    setTask(task);
    formik.values.editDescription = task.description;
    setIsShowDialog(true);
  };

  const submitUpdate = async (task: StateTaskInterface) => {
    try {
      checkExist(task);
      await requestUpdateTask(task);
      cancelUpdate();
      formik.resetForm();
      showToast('success', 'Tarefa atualizada com sucesso.');
    } catch (error) {
      if (error instanceof Error) {
        showAlert(error.message);
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
        <Button
          icon='pi pi-times'
          className='p-button-danger m-2'
          label='Excluir'
          onClick={() => showConfirmDialog(() => handleClickDelete(rowData.id))}
        />
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
          <form onSubmit={formik.handleSubmit}>
            <div className='formgroup-inline'>
              <div className='field'>
                <label
                  htmlFor='editDescription'
                  className={classNames({
                    'p-error': isFormFieldValid(),
                  })}
                >
                  Descrição *
                </label>
                <InputText
                  id='editDescription'
                  autoFocus
                  maxLength={255}
                  autoComplete='off'
                  value={formik.values.editDescription}
                  onChange={formik.handleChange}
                  className={classNames({
                    'p-invalid': isFormFieldValid(),
                  })}
                />
                {getFormErrorMessage()}
              </div>
              <Button
                type='submit'
                icon='pi pi-pencil'
                className='p-button-info mt-1'
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
          sortField={'created_at'}
          sortOrder={1}
        >
          <Column header='' body={checkboxBodyTemplate}></Column>
          <Column field='description' header='Tarefas' sortable></Column>
          <Column
            field='created_at'
            header='Criado em'
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
