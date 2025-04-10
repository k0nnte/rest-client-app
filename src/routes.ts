import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('./pages/MainPage.tsx'),
  route('signin', './pages/SignInPage.tsx'),
  route('signup', './pages/SignUpPage.tsx'),
  // route('client', './pages/Client.tsx'),
  route(null, './pages/Client.tsx', [route('rest', './pages/Rest.tsx')]),

  route('/*', './pages/ErrorPage.tsx'),
] satisfies RouteConfig;

// import { Route, Routes } from 'react-router';
// import ErrorPage from './pages/ErrorPage';
// import MainPage from './pages/MainPage';
// import Rest from './pages/Rest';
// import SignIn from './pages/SignInPage';
// import SignUp from './pages/SignUpPage';
// const AppRoutes = () => {
//   const navigationRoutes = [
//     {
//       path: '/',
//       element: <MainPage />,
//     },
//     { path: '/singin', element: <SignIn /> },
//     { path: '/signup', element: <SignUp /> },
//     { path: '/rest', element: <Rest /> },
//     { path: '/*', element: <ErrorPage /> },
//   ];

//   return (
//     <Routes>
//       {navigationRoutes.map((route) => {
//         return (
//           <Route key={route.path} path={route.path} element={route.element} />
//         );
//       })}
//     </Routes>
//   );
// };

// export default AppRoutes;
