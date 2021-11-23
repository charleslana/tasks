import AddTaskComponent from '../components/AddTaskComponent';
import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';
import TasksListComponent from '../components/TasksListComponent';
import { loaderService } from '../../../shared/services/LoaderService';

function TaskPage(): JSX.Element {
  const { loading } = loaderService();

  return (
    <BlockUI
      blocked={loading}
      className='block-ui-loading'
      template={
        <ProgressSpinner
          className='block-ui-spinner'
          strokeWidth='8'
          fill='var(--black-ground)'
          animationDuration='.5s'
        />
      }
    >
      <div className='p-3'>
        <AddTaskComponent />
        <TasksListComponent />
      </div>
    </BlockUI>
  );
}

export default TaskPage;
