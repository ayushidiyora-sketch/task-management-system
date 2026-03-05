import React from "react";
import TaskSidebarItem from "./TaskSidebarItem";
import {
  FiList,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

const TaskSidebar = ({
  tasks,
  filter,
  onFilterChange,
  onDelete,
  onToggleStatus,
  onEdit,
  onSelectTask,
  selectedTask,
}) => {
  const filters = [
    { value: "all", label: "All", icon: FiList },
    { value: "pending", label: "Pending", icon: FiClock },
    { value: "completed", label: "Completed", icon: FiCheckCircle },
    { value: "high-priority", label: "High Priority", icon: FiAlertTriangle },
  ];

  return (
    <div className="task-sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <h2>Tasks</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      {/* Filter Tabs */}
      <div className="sidebar-filters">
        {filters.map((f) => {
          const Icon = f.icon;

          return (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`filter-tab ${filter === f.value ? "active" : ""}`}
              title={f.label}
            >
              <span className="filter-icon">
                <Icon size={16} />
              </span>
              <span className="filter-label">{f.label}</span>
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="sidebar-task-list">
        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
            <small>Add a new task to get started</small>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskSidebarItem
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
              onSelect={onSelectTask}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskSidebar;