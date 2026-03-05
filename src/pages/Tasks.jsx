import React, { useState, useContext } from 'react';
import TaskForm from '../components/TaskForm';
import TaskSidebar from '../components/TaskSidebar';
import '../styles/tasks.css';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../context/UserContext';

const Tasks = () => {
    const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } = useContext(UserContext);
    const [filter, setFilter] = useState('all');
    const [editingTask, setEditingTask] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const getFilteredTasks = () => {
        switch (filter) {
            case 'completed':
                return tasks.filter((task) => task.status === 'completed');
            case 'pending':
                return tasks.filter((task) => task.status === 'pending');
            case 'high-priority':
                return tasks.filter(
                    (task) => task.priority === 'High' && task.status === 'pending'
                );
            default:
                return tasks;
        }
    };

    const filteredTasks = getFilteredTasks();

    return (
        <div className="dashboard-layout">
            <Sidebar />

            <div className="dashboard-main">
                <Topbar />



                <div className="dashboard-content">
                    <div className="task-management-container">
                        <div className="task-header">
                            <h1>Task Management</h1>
                            <p className="task-subtitle">Organize and track your tasks efficiently</p>
                        </div>

                        <div className="task-main-layout">
                        {/* Right Panel - Form */}
                            <div className="task-right-panel">
                                <TaskForm
                                    onSubmit={editingTask ? updateTask : addTask}
                                    editingTask={editingTask}
                                    onCancel={() => setEditingTask(null)}
                                />
                                <TaskSidebar
                                    tasks={filteredTasks}
                                    filter={filter}
                                    onFilterChange={setFilter}
                                    onDelete={deleteTask}
                                    onToggleStatus={toggleTaskStatus}
                                    onEdit={(task) => {
                                        setEditingTask(task);
                                        setSelectedTask(task);
                                    }}
                                    onSelectTask={setSelectedTask}
                                    selectedTask={selectedTask}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
