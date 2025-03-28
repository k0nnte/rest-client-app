import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/MainPage.tsx'),
  route('signin', './pages/SignInPage.tsx'),
  route('signup', './pages/SignUpPage.tsx'),
  route('/*', './pages/ErrorPage.tsx'),
] satisfies RouteConfig;
