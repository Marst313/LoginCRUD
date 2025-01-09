import { ITask, TTaskContext } from '@/utils/type';
import { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext<TTaskContext>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
});

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function addTask(newTask: ITask) {
    const newId = Date.now();
    setTasks((prevTasks: ITask[]) => [...prevTasks, { ...newTask, id: newId }]);
  }

  function updateTask(id: number | string, updatedTask: Partial<ITask>) {
    setTasks((prevTasks: ITask[]) => prevTasks.map((task: ITask) => (task.id === id ? { ...task, ...updatedTask } : task)));
  }

  function deleteTask(id: string | number) {
    setTasks((prev: ITask[]) => prev.filter((task: ITask) => task.id !== id));
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>{children}</TaskContext.Provider>;
}

export function useTaskHook() {
  return useContext(TaskContext);
}
