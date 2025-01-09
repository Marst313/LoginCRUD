import { useAuthContext } from '@/hooks/useAuthContext';
import { useUserContext } from '@/hooks/useUserContext';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router';

function Aside() {
  const { openSidebar, isDarkMode, toggleDarkMode, handleCloseSidebar } = useUserContext();
  const { logout } = useAuthContext();

  const asideref = useRef<null | HTMLDivElement>(null);

  /**
   * Handles click events outside the sidebar or hamburger button to close the sidebar.
   * This function is triggered when a 'mousedown' event occurs.
   *
   * @param {MouseEvent} event - The mouse event triggered when clicking outside the sidebar.
   */
  function handleClickOutside(event: MouseEvent): void {
    const target = event.target as Node;

    if (asideref.current && !asideref.current.contains(target) && !document.querySelector('.hamburger-button')?.contains(target)) {
      handleCloseSidebar();
    }
  }

  /**
   * Handles the 'Escape' key press event to close the sidebar.
   * This function is triggered when a 'keydown' event occurs with the 'Escape' key.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered when the 'Escape' key is pressed.
   */
  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      handleCloseSidebar();
    }
  }

  /**
   * Adds event listeners for 'mousedown' and 'keydown' to handle closing the sidebar
   * when clicking outside or pressing the 'Escape' key. Removes event listeners
   * on component unmount or cleanup.
   */
  useEffect(function () {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });
  return (
    <aside
      ref={asideref}
      className={`${
        openSidebar ? 'translate-x-0' : '-translate-x-full'
      } fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 pb-16 md:pb-0 `}
    >
      <div className="container-aside">
        {/* TOP SECTION */}
        <ul>
          <li>
            <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span className="ms-3">Dashboard</span>
            </NavLink>
          </li>
        </ul>

        {/* BOTTOM SECTION */}
        <div>
          <ul>
            {/* THEME TOGGLE */}
            <li>
              <button onClick={toggleDarkMode} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group text-start">
                {isDarkMode ? (
                  /* Icon Bulan */
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-sidebar">
                    <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="icon-sidebar">
                    <path fill="currentColor" d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0" />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                <span className="flex-1 ms-3 whitespace-nowrap">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </li>

            {/* Settings */}
            <li>
              <NavLink to="/settings" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <svg className="icon-sidebar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 2h12M6 6h6m-7 8h8M6 10h4" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Settings</span>
              </NavLink>
            </li>

            {/* Sign Out */}
            <li>
              <button type="button" className="group" onClick={logout}>
                <svg className="icon-sidebar" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Aside;
