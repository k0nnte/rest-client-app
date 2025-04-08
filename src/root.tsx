import './styles/index.css';
import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AuthProvider from './context/authProvider';

export default function Root() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>REST Client</title>
        <Meta />
        <Links />
      </head>
      <body>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
