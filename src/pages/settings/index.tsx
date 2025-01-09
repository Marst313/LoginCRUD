import { useAuthContext } from '@/hooks/useAuthContext';
import { updateUserProfile } from '@/utils/constants';
import { useState } from 'react';

function Settings() {
  // Access authentication context to get user data and login function
  const { user, login, isLoading } = useAuthContext();

  // Set up state for the user settings form
  const [formData, setFormData] = useState({
    username: user?.username || '', // Default username from user context
    email: user?.email || '', // Default email from user context
    password: user?.password || '', // Default password from user context
  });

  /**
   * Handles changes in form input fields.
   * Updates the `formData` state with the latest input values.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Update the value based on the input's name attribute
    }));
  };

  /**
   * Handles form submission.
   * Calls the `updateUserProfile` function to update the user data
   * and updates the authentication context if the update is successful.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event
   */
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    if (user?.email) {
      // Update the user profile based on the email in the user context
      const isUpdated = updateUserProfile(user.email, formData);

      if (isUpdated) {
        // If successful, update the user context with the new data
        login({ ...user, ...formData }, () => {});
      } else {
        // If failed, show an error message
        alert('Error updating profile!');
      }
    }
  };

  return (
    <main className="container__settings">
      <div>
        <h1 className="section-title">Settings</h1>

        {/* Section for Account Settings */}
        <div>
          <h2>Account Settings</h2>
          <form onSubmit={handleSave}>
            {/* USERNAME INPUT */}
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Enter your username" />
            </div>

            {/* EMAIl INPUT */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" placeholder="Enter your email" />
            </div>

            {/* PASSWORD INPUT*/}
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
            </div>

            {/* SAVE BUTTON */}
            <button disabled={isLoading} type="submit">
              {isLoading ? 'Loading...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Settings;
