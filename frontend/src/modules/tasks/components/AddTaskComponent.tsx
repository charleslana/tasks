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

  const submitAddTask = (e: any) => {
    e.preventDefault();
    if (!description.trim()) {
      return alert('Preencha o campo da descrição.');
    }
    const existTask = tasks.some(
      task =>
        task.description.toLowerCase() === description.toLowerCase().trim()
    );
    if (existTask) {
      return alert('Já existe uma tarefa com a mesma descrição adicionada.');
    }
    dispatch?.({
      type: ActionEnum.ADD_TASK,
      task: {
        id: count,
        description: description.trim(),
        completed: false,
      },
    });
    setDescription('');
    setCount(count + 1);
  };

  return (
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
  );
}

export default AddTaskComponent;
