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

  useEffect(() => {
    setTasks(sortedTasks);
  }, [sortedTasks]);

  const handleClickChecked = (task: StateInterface) => {
    dispatch?.({
      type: ActionEnum.CHECK_TASK,
      task: {
        id: task.id,
        description: task.description,
        completed: !task.completed,
      },
    });
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
  };

  const filterTask = (type: FilterTaskEnum) => {
    if (sortedTasks) {
      const filteredTask = FilterTaskReducer(sortedTasks, type);
      setTasks(filteredTask);
    }
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
                <input type='checkbox' />
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
                    <button onClick={() => handleClickChecked(task)}>
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
    </>
  );
}

export default TasksListComponent;
