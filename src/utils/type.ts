export type TUser = {
  username?: string | '';
  email: string | '';
  password?: string | '';
};

export type TToast = {
  message: string;
  type: 'success' | 'error';
};

export type TUserContext = {
  openSidebar: boolean;
  toggleSidebar: () => void;
  handleCloseSidebar: () => void;

  openDropdown: boolean;
  toggleDropdown: () => void;
  handleCloseDropdown: () => void;

  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export type TAuthContext = {
  user: TUser | null;
  login: (user: TUser, showToast: (toast: TToast) => void) => void;
  logout: () => void;
  setUser: (user: TUser) => void;

  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

export interface ITask {
  id: number | string;
  name: string;
  type: 'Done' | 'Process' | 'Declined';
}

export type TTaskContext = {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  updateTask: (id: string | number, updatedTask: ITask) => void;
  deleteTask: (id: string | number) => void;
};
