import React from 'react';

const TaskCard = ({ task, onDelete, onToggleStatus, onEdit }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'completed'
      ? 'bg-green-100 text-green-800 border-green-300'
      : 'bg-blue-100 text-blue-800 border-blue-300';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-5 border-l-4 transition duration-200 ${
        task.status === 'completed' ? 'border-l-green-500 opacity-75' : 'border-l-blue-500'
      }`}
    >
      {/* Title and Status */}
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-lg font-semibold ${
          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800'
        }`}>
          {task.title}
        </h3>
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(task.status)}`}>
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-sm mb-3">
          {task.description}
        </p>
      )}

      {/* Priority and Due Date */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(task.priority)}`}>
          {task.priority} Priority
        </span>
        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 border border-gray-300">
          📅 {formatDate(task.dueDate)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-3 border-t border-gray-200">
        <button
          onClick={() => onToggleStatus(task.id)}
          className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition duration-200 ${
            task.status === 'completed'
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {task.status === 'completed' ? 'Undo' : 'Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-3 rounded-lg font-medium text-sm transition duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-lg font-medium text-sm transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
