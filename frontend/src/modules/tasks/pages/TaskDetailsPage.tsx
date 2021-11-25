import React, { useEffect, useState } from 'react';
import showTaskService from '../services/ShowTaskService';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import { alertService } from '../../../shared/services/AlertService';
import { Badge } from 'primereact/badge';
import { Link } from 'react-router-dom';
import { loaderService } from '../../../shared/services/LoaderService';
import { useParams } from 'react-router';

function TaskDetailsPage(): JSX.Element {
  const { id } = useParams();
  const { showLoading, hideLoading } = loaderService();
  const { showAlert } = alertService();
  const [task, setTask] = useState<StateTaskInterface>();

  useEffect(() => {
    showTask(id);
  }, [showTaskService]);

  const showTask = async (id?: string) => {
    if (id) {
      showLoading();
      await showTaskService(parseInt(id))
        .then(response => {
          setTask(response);
        })
        .catch(error => {
          showAlert(error.message);
        })
        .finally(() => hideLoading());
    }
  };

  return (
    <div className='p-3 text-center'>
      {task ? (
        <>
          <h1>{task.description}</h1>
          <p>
            Status:{' '}
            {task.completed ? (
              <Badge value='Finalizado' severity='success'></Badge>
            ) : (
              <Badge value='Ativo' severity='info'></Badge>
            )}
          </p>
          <p>Data da criação: {new Date(task.created_at).toLocaleString()}</p>
        </>
      ) : null}
      <div>
        <Link to='/'>Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
