import React, { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        dueDate: '',
      });
    }
    setErrors({});
  }, [editingTask]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingTask) {
      onSubmit(editingTask.id, formData);
      setSuccessMessage("Task updated successfully!");
    } else {
      onSubmit(formData);
      setSuccessMessage("Task added successfully!");
    }

    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="task-form-container">
 {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="task-form">

        {/* Task Title */}
        <div className="form-group">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`form-input ${errors.title ? 'error' : ''}`}
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="3"
            className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="task-form-d-flex">

          {/* Priority */}
          <div className="form-group w-50">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-input form-select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="form-group w-50">
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="form-buttons">

          <button type="submit" className="btn btn-addtask">
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {editingTask ? (
                <>
                  <FiSave size={18} />
                  Update Task
                </>
              ) : (
                <>
                  <FiPlus size={18} />
                  Add Task
                </>
              )}
            </span>
          </button>

          {editingTask && (
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-secondary"
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <FiX size={16} />
                Cancel
              </span>
            </button>
          )}

        </div>

      </form>
    </div>
  );
};

export default TaskForm;