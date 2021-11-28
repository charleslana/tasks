import AddTaskComponent from '../components/AddTaskComponent';
import Loading from '../../../shared/components/Loading';
import React from 'react';
import TasksListComponent from '../components/TasksListComponent';

function TaskPage(): JSX.Element {
  return (
    <div className='p-3'>
      <Loading />
      <AddTaskComponent />
      <TasksListComponent />
    </div>
  );
}

export default TaskPage;
