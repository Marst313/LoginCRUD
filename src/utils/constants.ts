import { TUser } from './type';

export const userRegistered: TUser[] = [
  {
    email: 'admin@gmail.com',
    password: 'admin',
    username: 'admin',
  },
  {
    email: 'adminbaru@gmail.com',
    password: 'adminbaru',
    username: 'adminbaru',
  },
];

/**
 * Update user profile in userRegistered list
 * @param email The unique identifier for the user
 * @param updatedData The data to update (partial TUser object)
 * @returns boolean indicating success or failure
 */
export function updateUserProfile(email: string, updatedData: Partial<TUser>): boolean {
  const userIndex = userRegistered.findIndex((user) => user.email === email);

  if (userIndex !== -1) {
    // UPDATE USER DATA
    userRegistered[userIndex] = {
      ...userRegistered[userIndex],
      ...updatedData,
    };
    return true;
  }

  return false; // User not found
}
