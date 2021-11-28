import React from 'react';
import { BlockUI } from 'primereact/blockui';
import { loaderService } from '../services/LoaderService';
import { ProgressSpinner } from 'primereact/progressspinner';

function Loading() {
  const { loading } = loaderService();

  return (
    <BlockUI
      blocked={loading}
      className='block-ui-loading'
      fullScreen
      template={
        <ProgressSpinner
          className='block-ui-spinner'
          strokeWidth='8'
          fill='var(--black-ground)'
          animationDuration='.5s'
        />
      }
    ></BlockUI>
  );
}

export default Loading;
