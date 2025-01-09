import logo from '@/assets/images/aksamedia-logo-2.webp';
import Toast from '@/components/toast';
import { useAuthContext } from '@/hooks/useAuthContext';
import { TToast, TUser } from '@/utils/type';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {
  // Access authentication context values and functions
  const { login, isAuthenticated, isLoading } = useAuthContext();

  // Local state to manage the user input for login form
  const [user, setUser] = useState<TUser>({
    email: '',
    password: '',
  });

  // Local state to manage toast notifications
  const [toast, setToast] = useState<TToast | null>(null);

  const navigate = useNavigate();

  /**
   * Handles changes in the input fields.
   * Updates the `user` state with the new input values.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user, // Preserve previous state
      [e.target.name]: e.target.value, // Update the field corresponding to the input's `name` attribute
    });
  }

  /**
   * Handles form submission.
   * Calls the `login` function with the user input and sets the toast notification.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Trigger the login function and set the toast notification
    login({ email: user?.email, password: user?.password, username: user?.email.split('@')[0] }, (toast: TToast) => setToast(toast));
  }

  /**
   * Redirects the user to the home page if they are authenticated.
   * Runs every time the `isAuthenticated` value changes.
   */
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to the homepage
    }
  }, [isAuthenticated]);
  return (
    <section>
      <div className="block">
        <img src={logo} alt="Logo Login" className="logo" />
      </div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* FORM FIELD */}
      <form className="form-login" onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>

        {/* EMAIL INPUT */}
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" placeholder="admin@gmail.com" required onChange={handleChange} />
        </div>
        {/* EMAIL INPUT */}

        {/* PASSWORD INPUT */}
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="admin" required onChange={handleChange} />
        </div>
        {/* PASSWORD INPUT */}

        {/* REMEMBER ME */}
        <div className="remember-me">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </div>
        {/* REMEMBER ME */}

        {/* SUBMIT BUTTON */}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {/* SUBMIT BUTTON */}
      </form>
      {/* FORM FIELD */}
    </section>
  );
}

export default Login;
