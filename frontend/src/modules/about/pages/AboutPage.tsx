import React from 'react';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

function AboutPage(): JSX.Element {
  return (
    <div className='p-3 text-center'>
      <h1>Sobre o projeto</h1>
      <p>
        O Projeto foi desenvolvido em conjunto com o grupo do trabalho da
        faculdade Una.
      </p>
      <Divider />
      <div className='grid justify-content-center'>
        <Card>
          <ul className='text-left'>
            <li>Charles Lana</li>
            <li>Bruno Menezes</li>
            <li>Flavio Adriano</li>
            <li>Izabelle Pereira</li>
            <li>João Vitor de Freitas</li>
            <li>Matheus Gomes</li>
            <li>Vinícius Lopes</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default AboutPage;
