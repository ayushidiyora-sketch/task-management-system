import React from 'react';
import { FiEdit2, FiSave, FiTrash2 } from 'react-icons/fi';

const TaskSidebarItem = ({
  task,
  isSelected,
  onSelect,
  onDelete,
  onToggleStatus,
  onEdit,
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  const isPending = task.status === 'pending';

  return (
    <div
      className={`sidebar-task-item ${isSelected ? 'selected' : ''} ${
        !isPending ? 'completed' : ''
      }`}
      onClick={() => onSelect(task)}
    >
      {/* Checkbox */}
      <div className="task-item-checkbox">
        <input
          type="checkbox"
          checked={task.status === 'completed'}
          onChange={() => onToggleStatus(task.id)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* Content */}
      <div className="task-item-content">
        <h4 className="task-item-title">{task.title}</h4>
        {task.description && (
          <p className="task-item-description">{task.description.substring(0, 40)}...</p>
        )}
        <div className="task-item-meta">
          <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
          {task.dueDate && (
            <span className="due-date-badge">
              {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>


<div className="task-item-actions">
  <button
    className="action-btn edit-btn"
    onClick={(e) => {
      e.stopPropagation();
      onEdit(task);
    }}
    title="Edit task"
  >
    <FiEdit2 size={16} />
  </button>

  <button
    className="action-btn delete-btn"
    onClick={(e) => {
      e.stopPropagation();
      onDelete(task.id);
    }}
    title="Delete task"
  >
    <FiTrash2 size={16} />
  </button>
</div>
</div>
  );
};

export default TaskSidebarItem;

