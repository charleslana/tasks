import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import ActionEnum from '../enumerations/ActionEnum';

function NavbarComponent(): JSX.Element {
  const { tasks, dispatch } = useContext(TaskContext);

  const handleClick = () => {
    dispatch?.({
      type: ActionEnum.ADD_TASK,
      task: {
        id: 1,
        description: 'Hello Dev',
        isChecked: false,
      },
    });
  };

  return (
    <div>
      <p>Task list size: {tasks.length}</p>
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default NavbarComponent;
