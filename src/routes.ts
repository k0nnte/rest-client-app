import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/MainPage.tsx'),
  route('signin', './pages/SignInPage.tsx'),
  route('signup', './pages/SignUpPage.tsx'),
  // route('client', './pages/Client.tsx'),
  route('rest', './pages/Client.tsx'),
  route('/*', './pages/ErrorPage.tsx'),
] satisfies RouteConfig;
