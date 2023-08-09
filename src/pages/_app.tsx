import '@/src/styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { NavBar } from '@/src/components/NavBar';
import { Footer } from '@/src/components/Footer';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(error => {
          console.error('Error al registrar el Service Worker:', error);
        })
    }

  }, [])

  return (
    <NavBar>
      <Component {...pageProps} />
      <Footer />
    </NavBar>
  );
}
