import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <div className='p-3 text-center'>
      <h1>Página não encontrada</h1>
      <Link className='p-button' to='/'>
        Voltar para a Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
