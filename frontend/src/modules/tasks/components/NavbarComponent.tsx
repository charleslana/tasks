import React, { useEffect, useRef } from 'react';
import { alertService } from '../../../shared/services/AlertService';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Menubar } from 'primereact/menubar';
import { Toast } from 'primereact/toast';
import { toastService } from '../../../shared/services/ToastService';
import { useNavigate } from 'react-router-dom';

function NavbarComponent(): JSX.Element {
  const { toast, hideToast, severity, detail } = toastService();
  const { alert, hideAlert, message } = alertService();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Tarefas',
      command: () => navigate('/'),
    },
    {
      label: 'Sobre',
      command: () => navigate('/about'),
    },
    {
      label: 'Inexistente',
      command: () => navigate('/error'),
    },
  ];

  const start = (
    <div className='text-3xl p-mr-2 mr-2'>Minha lista de tarefas</div>
  );

  const toastRef = useRef<any>();
  useEffect(() => {
    checkToast();
  });

  const checkToast = () => {
    if (toast) {
      toastRef.current.show({
        severity: severity,
        detail: detail,
      });
      hideToast();
    }
  };

  const renderFooter = () => {
    return (
      <Button label='Ok' icon='pi pi-check' onClick={hideAlert} autoFocus />
    );
  };

  return (
    <>
      <Toast ref={toastRef} />
      <Dialog
        header='Alerta'
        visible={alert}
        onHide={hideAlert}
        breakpoints={{ '960px': '75vw' }}
        className='dialog-size'
        draggable={false}
        footer={renderFooter}
      >
        <p>{message}</p>
      </Dialog>
      <Menubar model={menuItems} start={start} className='mb-3' />
    </>
  );
}

export default NavbarComponent;
