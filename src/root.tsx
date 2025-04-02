import './styles/index.css';
import React from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthProvider from './context/authProvider';
import { Route } from './+types/root';
import { useChangeLanguage } from 'remix-i18next/react';
import { useTranslation } from 'react-i18next';
import i18next from './i18n.server';
import { useLoaderData } from 'react-router';

export async function loader({ request }: Route.LoaderArgs) {
  const locale = await i18next.getLocale(request);
  return { locale };
}

export const handle = {
  i18n: 'common',
};

export default function Root() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);

  return (
    <>
      <Outlet />
    </>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} dir={i18n.dir()}>
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
