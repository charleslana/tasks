import { Link } from 'react-router-dom';
import React from 'react';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <h1>Página não encontrada</h1>
      <div>
        <Link to='/'>Voltar para a Home</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
