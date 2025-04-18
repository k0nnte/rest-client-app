import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/MainPage.tsx'),
  route('signin', './pages/SignInPage.tsx'),
  route('signup', './pages/SignUpPage.tsx'),
  route(null, './pages/Client.tsx', [
    route('rest/:metod?/:url?/:body?', './pages/Rest.ts'),
    route('history', './pages/HistoryPage.tsx'),
    route('variables', './pages/VariablesPage.tsx'),
  ]),
] satisfies RouteConfig;
