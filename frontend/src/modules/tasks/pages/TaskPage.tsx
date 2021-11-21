import AddTaskComponent from '../components/AddTaskComponent';
import React from 'react';
import TasksListComponent from '../components/TasksListComponent';

function TaskPage(): JSX.Element {
  return (
    <>
      <AddTaskComponent />
      <TasksListComponent />
    </>
  );
}

export default TaskPage;
