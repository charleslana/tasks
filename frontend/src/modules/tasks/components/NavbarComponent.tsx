import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

function NavbarComponent(): JSX.Element {
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

  return <Menubar model={menuItems} start={start} className='mb-3' />;
}

export default NavbarComponent;
