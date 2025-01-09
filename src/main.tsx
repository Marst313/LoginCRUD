import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import router from '@/router';
import '@/assets/styles/index.css';
import { UserProvider } from '@/hooks/useUserContext';
import { AuthProvider } from '@/hooks/useAuthContext';
import { TaskProvider } from './hooks/useTaskContext';
import { PaginationProvider } from './hooks/usePaginationContext';
import { SearchProvider } from './hooks/useSearchContext';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <AuthProvider>
      <TaskProvider>
        <PaginationProvider>
          <SearchProvider>
            <RouterProvider router={router} />
          </SearchProvider>
        </PaginationProvider>
      </TaskProvider>
    </AuthProvider>
  </UserProvider>
);
