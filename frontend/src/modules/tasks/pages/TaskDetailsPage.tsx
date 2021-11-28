import Loading from '../../../shared/components/Loading';
import React, { useEffect, useState } from 'react';
import showTaskService from '../services/ShowTaskService';
import StateTaskInterface from '../interfaces/StateTaskInterface';
import { alertService } from '../../../shared/services/AlertService';
import { Badge } from 'primereact/badge';
import { Link } from 'react-router-dom';
import { loaderService } from '../../../shared/services/LoaderService';
import { Timeline } from 'primereact/timeline';
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
      <Loading />
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
          <p>Data da criação: {new Date(task.createdAt).toLocaleString()}</p>
          {task.updatedAt ? (
            <p>
              Útilma atualização: {new Date(task.updatedAt).toLocaleString()}
            </p>
          ) : null}
          <h3>Histórico</h3>
          <Timeline
            className='mb-5'
            value={task.historiesTask}
            opposite={item => item.description}
            content={item => (
              <small className='p-text-secondary'>
                {new Date(item.createdAt).toLocaleString()}
              </small>
            )}
          />
        </>
      ) : null}
      <div>
        <Link to='/'>Voltar para a Home</Link>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
