import { userRegistered } from '@/utils/constants';
import { TAuthContext, TToast, TUser } from '@/utils/type';
import { createContext, useContext, useState, useEffect } from 'react';

// Create an authentication context with default values
const AuthContext = createContext<TAuthContext>({
  login: () => {},
  logout: () => {},
  setIsAuthenticated: () => {},
  setUser: () => {},
  isAuthenticated: false,
  isLoading: false,
  user: null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handles user login.
   *
   * @param {TUser} data - The login credentials (email and password).
   * @param {(toast: TToast) => void} showToast - Function to display toast notifications.
   */
  function login(data: TUser, showToast: (toast: TToast) => void) {
    setIsLoading(true); // Set loading state to true during login process

    // Check if the provided email and password match a registered user
    const userFound = userRegistered.find((registeredUser: TUser) => registeredUser.email === data.email && registeredUser.password === data.password);

    if (userFound) {
      // If the user is found, update user state and authentication status
      setUser(data);
      setIsAuthenticated(true);

      // Save user data and authentication status to local storage
      localStorage.setItem('user', JSON.stringify(data));
      localStorage.setItem('isAuthenticated', 'true');

      // Show a success toast notification
      showToast({ message: 'Login successful!', type: 'success' });
    } else {
      // Show an error toast notification if login fails
      showToast({ message: 'Invalid email or password!', type: 'error' });
    }
    setIsLoading(false); // Set loading state to false after the login process
  }

  /**
   * Handles user logout by clearing authentication state and local storage.
   */
  function logout() {
    setIsAuthenticated(false);
    setUser(null);

    // Remove user data and authentication status from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  }

  /**
   * Checks if a user is already logged in by reading data from local storage.
   * Runs once when the component is mounted.
   */
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (storedUser && storedIsAuthenticated) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        setUser,
        isLoading,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume the authentication context.
 *
 * @returns {TAuthContext} The authentication context values and functions.
 */
function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
