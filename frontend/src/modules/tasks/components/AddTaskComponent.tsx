import React, { useContext, useEffect, useRef, useState } from 'react';
import ActionEnum from '../../../shared/enumerations/ActionEnum';
import { TaskContext } from '../../../shared/contexts/TaskContext';

function AddTaskComponent(): JSX.Element {
  const { dispatch, tasks } = useContext(TaskContext);
  const [description, setDescription] = useState('');
  const [count, setCount] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  });

  const checkExist = () => {
    const existTask = tasks.some(
      task =>
        task.description.toLowerCase() === description.toLowerCase().trim()
    );
    if (existTask) {
      throw new Error('Já existe uma tarefa com a mesma descrição adicionada.');
    }
  };

  const checkIsNotEmpty = (value: string) => {
    if (!value.trim()) {
      throw new Error('Preencha o campo da descrição.');
    }
  };

  const dispatchAddTask = () => {
    dispatch?.({
      type: ActionEnum.ADD_TASK,
      task: {
        id: count,
        description: description.trim(),
        completed: false,
      },
    });
  };

  const submitAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      checkIsNotEmpty(description);
      checkExist();
      dispatchAddTask();
      setDescription('');
      setCount(count + 1);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <>
      <h1>Minha lista de tarefas</h1>
      <div>Tarefas total: {tasks.length}</div>
      <div>Tarefas ativas: {tasks.filter(task => task.completed).length}</div>
      <div>
        Tarefas finalizadas: {tasks.filter(task => !task.completed).length}
      </div>
      <form onSubmit={submitAddTask}>
        <input
          ref={inputRef}
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
        />
        <button>Adicionar</button>
      </form>
    </>
  );
}

export default AddTaskComponent;
