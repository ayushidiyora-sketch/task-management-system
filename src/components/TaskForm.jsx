import React, { useState, useEffect } from 'react';
import { FiPlus, FiSave, FiX } from 'react-icons/fi';

const TaskForm = ({ onSubmit, editingTask, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

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
    if (!formData.description.trim()){
        newErrors.description = 'task descripition is required';
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
    } else {
      onSubmit(formData);
    }

    setFormData({
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: '',
    });
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        {/* Task Title */}
        <div className="form-group">
          {/* <label htmlFor="title" className="form-label">
            Task Title <span className="required">*</span>
          </label> */}
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className={`form-input ${errors.title ? 'error' : ''}`}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        {/* Description */}
        <div className="form-group">
          {/* <label htmlFor="description" className="form-label">
            Description
          </label> */}
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="3"
            className={`form-input form-textarea ${errors.description ? 'error' : ''}`}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
<div className="task-form-d-flex">
 {/* Priority */}
        <div className="form-group w-50">
          {/* <label htmlFor="priority" className="form-label">
            Priority Level
          </label> */}
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="form-input form-select"
          >
            <option value="Low"> Low</option>
            <option value="Medium"> Medium</option>
            <option value="High"> High</option>
          </select>
        </div>

        {/* Due Date */}
        <div className="form-group w-50">
          {/* <label htmlFor="dueDate" className="form-label">
            Due Date
          </label> */}
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
  <button type="submit" className="btn btn-primary">
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
