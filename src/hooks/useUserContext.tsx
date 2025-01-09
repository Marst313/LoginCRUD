import { TUserContext } from '@/utils/type';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext<TUserContext>({
  openSidebar: false,
  toggleSidebar: () => {},
  handleCloseSidebar: () => {},

  openDropdown: false,
  toggleDropdown: () => {},
  handleCloseDropdown: () => {},

  isDarkMode: false,
  toggleDarkMode: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  // Retrieve saved dark mode preference from local storage, or fallback to system settings
  const savedDarkMode = localStorage.getItem('isDarkMode') === 'true';
  const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const [isDarkMode, setIsDarkMode] = useState<boolean>(savedDarkMode !== false ? savedDarkMode : systemDarkMode);

  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  /**
   * Toggles the sidebar's open/close state.
   */
  function toggleSidebar() {
    setOpenSidebar((prev) => !prev);
  }

  /**
   * Closes the sidebar by setting its state to `false`.
   */
  function handleCloseSidebar() {
    setOpenSidebar(false);
  }

  /**
   * Toggles the dropdown menu's open/close state.
   */
  function toggleDropdown() {
    setOpenDropdown((prev) => !prev);
  }

  /**
   * Closes the dropdown menu by setting its state to `false`.
   */
  function handleCloseDropdown() {
    setOpenDropdown(false);
  }

  /**
   * Toggles dark mode between enabled and disabled.
   * Updates local storage and applies the "dark" class to the HTML document.
   */
  function toggleDarkMode() {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;

      localStorage.setItem('isDarkMode', newDarkMode.toString());
      document.documentElement.classList.toggle('dark', newDarkMode);
      return newDarkMode;
    });
  }

  /**
   * Effect to synchronize the dark mode state with the HTML document's class.
   * Runs whenever the `isDarkMode` state changes.
   */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <UserContext.Provider
      value={{
        openSidebar,
        handleCloseSidebar,
        toggleSidebar,
        openDropdown,
        toggleDropdown,
        handleCloseDropdown,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

/**
 * Custom hook to access the user context.
 *
 * @returns {TUserContext} The user context values and functions.
 */
function useUserContext() {
  return useContext(UserContext);
}

export { UserProvider, useUserContext };
