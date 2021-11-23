import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox';
import React, { useContext, useEffect, useState } from 'react';
import updateTaskRequest, {
  arrayCompletedTaskService,
  completedTaskService,
} from '../services/UpdateTaskService';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import FilterTaskComponent from './FilterTaskComponent';
import FilterTaskEnum from '../enumerations/FilterTaskEnum';
import FilterTaskReducer from '../reducers/FilterTaskReducer';
import { InputText } from 'primereact/inputtext';
import { ScrollTop } from 'primereact/scrolltop';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import { TaskContext } from '../contexts/TaskContext';
import TaskEnum from '../enumerations/TaskEnum';
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
      type: TaskEnum.CHECK_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: task.completed,
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
        id: task.id,
        description: description,
        completed: task.completed,
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
              onClick={() => handleFinish(rowData)}
            />
          </>
        ) : null}
        {id !== rowData.id ? (
          <Button
            icon='pi pi-times'
            className='p-button-danger m-2'
            label='Excluir'
            onClick={() => handleClickDelete(rowData.id)}
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

  const descriptionBodyTemplate = (rowData: StateTaskInterface) => {
    return (
      <>
        {id === rowData.id ? (
          <>
            <form onSubmit={e => submitUpdate(e, rowData)}>
              <div className='formgroup-inline'>
                <div className='field'>
                  <label>Descrição</label>
                  <InputText
                    autoFocus
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
            <Button
              icon='pi pi-angle-left'
              className='p-button-secondary'
              label='Cancelar'
              onClick={() => setId(0)}
            />
          </>
        ) : (
          rowData.description
        )}
      </>
    );
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
          <Column
            field='description'
            header='Tarefas'
            body={descriptionBodyTemplate}
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
          onClick={handleFinishAll}
        />
      )}
    </>
  );
}

export default TasksListComponent;
