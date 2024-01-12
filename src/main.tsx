import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { WixDesignSystemProvider } from '@wix/design-system';
import "@wix/design-system/styles.global.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <App />
    </WixDesignSystemProvider>
  </React.StrictMode>,
)
