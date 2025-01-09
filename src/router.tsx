import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('@/components/SharedLayout')).default,
    }),
    children: [
      {
        path: '',
        lazy: async () => ({
          Component: (await import('@/components/ProtectedRoutes')).default,
        }),
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('@/pages/home')).default,
            }),
          },
          {
            path: 'settings',
            lazy: async () => ({
              Component: (await import('@/pages/settings')).default,
            }),
          },
        ],
      },
    ],
  },

  {
    path: 'login',
    lazy: async () => ({
      Component: (await import('@/pages/login')).default,
    }),
  },
]);

export default router;
