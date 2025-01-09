import { ITask } from '@/utils/type';

interface ModalTaskProps {
  newTaskName: string;
  setNewTaskName: React.Dispatch<React.SetStateAction<string>>;
  newTaskType: 'Done' | 'Process' | 'Declined'; // New task type prop
  setNewTaskType: React.Dispatch<React.SetStateAction<'Done' | 'Process' | 'Declined'>>; // Setter for task type
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: (e: React.FormEvent<HTMLFormElement>) => void;
  taskToUpdate: ITask | null;
}

function ModalTask({ newTaskName, setNewTaskName, newTaskType, setNewTaskType, setShowModal, handleAddTask, taskToUpdate }: ModalTaskProps) {
  return (
    <form className="container__modal-task" onSubmit={handleAddTask}>
      <div>
        <h2 className="title">{taskToUpdate ? 'Update Task' : 'Add New Task'}</h2>

        <input type="text" value={newTaskName} onChange={(e) => setNewTaskName(e.target.value)} placeholder="Task name" />

        <select value={newTaskType} onChange={(e) => setNewTaskType(e.target.value as 'Done' | 'Process' | 'Declined')}>
          <option value="Done">Done</option>
          <option value="Process">Process</option>
          <option value="Declined">Declined</option>
        </select>

        <div>
          <button type="button" onClick={() => setShowModal(false)} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="add-button">
            {taskToUpdate ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ModalTask;
