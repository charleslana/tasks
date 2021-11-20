import React, { useContext, useEffect, useState } from 'react';
import ActionEnum from '../../../shared/enumerations/ActionEnum';
import FilterTaskComponent from './FilterTaskComponent';
import FilterTaskEnum from '../../../shared/enumerations/FilterTaskEnum';
import FilterTaskReducer from '../../../shared/reducers/FilterTaskReducer';
import StateInterface from '../../../shared/interfaces/StateInterface';
import { TaskContext } from '../../../shared/contexts/TaskContext';

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

  const handleFinish = (task: StateInterface) => {
    dispatch?.({
      type: ActionEnum.CHECK_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: !task.completed,
      },
    });
    setIsCheck(isCheck.filter(item => item !== task.id.toString()));
  };

  const showEdit = (task: StateInterface) => {
    setDescription(task.description);
    setId(task.id);
  };

  const submitUpdate = (e: any, task: StateInterface) => {
    e.preventDefault();
    if (!description.trim()) {
      return alert('Preencha o campo da descrição.');
    }
    const existTask = tasks?.some(
      item =>
        item.description.toLowerCase() === description.toLowerCase().trim() &&
        item.id !== task.id
    );
    if (existTask) {
      return alert('Já existe uma tarefa com a mesma descrição adicionada.');
    }
    dispatch?.({
      type: ActionEnum.UPDATE_TASK,
      task: {
        id: task.id,
        description: description,
        completed: task.completed,
      },
    });
    setId(0);
    setDescription('');
  };

  const handleClickDelete = (id: number) => {
    dispatch?.({
      type: ActionEnum.REMOVE_TASK,
      id: id,
    });
    setIsCheck(isCheck.filter(item => item !== id.toString()));
  };

  const filterTask = (type: FilterTaskEnum) => {
    if (sortedTasks) {
      const filteredTask = FilterTaskReducer(sortedTasks, type);
      setTasks(filteredTask);
    }
  };

  const handleClickCheck = (e: any) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
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

  const handleFinishAll = () => {
    isCheck.forEach(id => {
      if (tasks) {
        const taskIndex = tasks.findIndex(
          (task: StateInterface) => task.id === parseInt(id)
        );
        handleFinish(tasks[taskIndex]);
      }
    });
    setIsCheck([]);
  };

  return (
    <>
      <FilterTaskComponent filterTask={filterTask} />
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
          {tasks?.map((task: StateInterface) => (
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
