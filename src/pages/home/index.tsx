import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useTaskHook } from '@/hooks/useTaskContext';
import { ITask } from '@/utils/type';
import { ModalTask } from './component';
import { usePaginationHook } from '@/hooks/usePaginationContext';
import { useSearchHook } from '@/hooks/useSearchContext';

function Home() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskHook();
  const { currentPage, setCurrentPage, pageSize } = usePaginationHook();
  const { search, setSearch, taskTypeFilter, setTaskTypeFilter } = useSearchHook();

  const navigate = useNavigate();
  const location = useLocation();

  const [filteredTasks, setFilteredTasks] = useState<ITask[]>([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskType, setNewTaskType] = useState<'Done' | 'Process' | 'Declined'>('Process');
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const paginatedTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  /**
   * Handles the task addition or update based on whether a task is selected for updating.
   * This function is triggered on form submission.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  function handleAddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (newTaskName.trim() !== '') {
      if (taskToUpdate) {
        updateTask(taskToUpdate.id, { name: newTaskName, type: newTaskType, id: taskToUpdate.id });
      } else {
        addTask({ name: newTaskName, type: newTaskType, id: Date.now() });
      }
      setShowModal(false);
      setNewTaskName('');
      setNewTaskType('Done');
      setTaskToUpdate(null);
    }
  }

  /**
   * Prepares the task for editing by populating the modal with its data.
   *
   * @param {ITask} task - The task to be edited.
   */
  function handleEditTask(task: ITask) {
    setNewTaskName(task.name);
    setTaskToUpdate(task);
    setShowModal(true);
  }

  /**
   * Parses the query string to set the search term, current page, and task type filter on page load.
   * This ensures that the URL reflects the current state of search, pagination, and task type filter.
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    const pageParam = parseInt(params.get('page') || '1', 10);
    const typeParam = params.get('type') || '';

    setSearch(searchParam);
    setCurrentPage(pageParam);
    setTaskTypeFilter(typeParam as 'Done' | 'Process' | 'Declined' | '');
  }, [location.search, setCurrentPage, setSearch, setTaskTypeFilter]);

  /**
   * Updates the URL query string whenever the search, current page, or task type filter state changes.
   * This ensures that the user can bookmark or share the exact search, pagination, and filter state.
   */
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (currentPage !== 1) params.set('page', String(currentPage));
    if (taskTypeFilter) params.set('type', taskTypeFilter);
    navigate({ search: params.toString() });
  }, [search, currentPage, taskTypeFilter, navigate]);

  /**
   * Filters the tasks based on the search term and task type filter.
   * It also adjusts the current page to ensure it points to a valid page after filtering.
   */
  useEffect(() => {
    let filtered = tasks.filter((task) => task.name.toLowerCase().includes(search.toLowerCase()));

    if (taskTypeFilter) {
      filtered = filtered.filter((task) => task.type === taskTypeFilter);
    }

    setFilteredTasks(filtered);

    // Check if the current page is valid for the filtered tasks
    const totalPages = Math.ceil(filtered.length / pageSize);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tasks, search, currentPage, pageSize, taskTypeFilter]);

  return (
    <main className="p-4 sm:ml-64">
      <div className="container__home">
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // Using context's setSearch
            placeholder="Search tasks..."
            className="p-2 border rounded dark:text-gray-200 dark:bg-gray-800"
          />
          <div>
            <select value={taskTypeFilter} onChange={(e) => setTaskTypeFilter(e.target.value as 'Done' | 'Process' | 'Declined' | '')} className="p-2 border rounded dark:text-gray-200 dark:bg-gray-800">
              <option value="">All Types</option>
              <option value="Done">Done</option>
              <option value="Process">Process</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
          <div className="text-sm text-gray-800 dark:text-gray-200 font-bold">Total Tasks: {filteredTasks.length}</div>
          <button
            onClick={() => {
              setShowModal(true);
              setTaskToUpdate(null);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add New Task
          </button>
        </div>

        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>NO</th>
                <th>ID</th>
                <th>Task Name</th>
                <th>Task Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{(currentPage - 1) * pageSize + index + 1}</td>
                  <td>{task.id}</td>
                  <td>{task.name}</td>
                  <td>
                    <span className={`px-4 py-2 rounded-full ${task.type === 'Done' ? 'bg-green-500 text-white' : task.type === 'Process' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>{task.type}</span>
                  </td>
                  <td>
                    <button onClick={() => handleEditTask(task)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 disabled:hover:bg-gray-300 text-gray-800">
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTasks.length / pageSize)}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredTasks.length / pageSize)))}
          disabled={currentPage === Math.ceil(filteredTasks.length / pageSize)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 hover:bg-gray-400 disabled:hover:bg-gray-300 text-gray-800"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {showModal && <ModalTask taskToUpdate={taskToUpdate} handleAddTask={handleAddTask} newTaskName={newTaskName} setNewTaskName={setNewTaskName} newTaskType={newTaskType} setNewTaskType={setNewTaskType} setShowModal={setShowModal} />}
    </main>
  );
}

export default Home;
