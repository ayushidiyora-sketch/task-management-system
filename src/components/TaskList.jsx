import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, onToggleStatus, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks found. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TaskList;
