import React, { useContext } from 'react';
import ActionEnum from '../../../shared/enumerations/ActionEnum';
import { TaskContext } from '../../../shared/contexts/TaskContext';

function NavbarComponent() {
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
