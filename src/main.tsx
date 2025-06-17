import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { DesignSystemProvider } from './context/DesignSystemContext';
import './styles/global.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <DesignSystemProvider>
      <App />
    </DesignSystemProvider>
  </StrictMode>,
);
