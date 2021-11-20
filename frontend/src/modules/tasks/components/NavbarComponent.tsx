import React, { useContext } from 'react';
import { TaskContext } from '../../../shared/contexts/TaskContext';

function NavbarComponent(): JSX.Element {
  const { tasks } = useContext(TaskContext);

  return (
    <div>
      <h1>Minha lista de tarefas, total de: {tasks.length}</h1>
    </div>
  );
}

export default NavbarComponent;
