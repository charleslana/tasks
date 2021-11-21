import { Link } from 'react-router-dom';
import React from 'react';

function NavbarComponent(): JSX.Element {
  return (
    <>
      <div>
        <Link to='/'>Home</Link> | <Link to='/about'>Sobre</Link> |{' '}
        <Link to='/error'>Inexistente</Link>
      </div>
      <br />
    </>
  );
}

export default NavbarComponent;
