import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    const userEmail = localStorage.getItem('userEmail');
    
    if (storedTasks) {
      try {
        setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error('Error loading tasks:', error);
      }
    }
    
    if (userEmail) {
      setUser({ email: userEmail });
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); 

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    return newTask;
  };

  const updateTask = (id, updatedData) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === 'pending' ? 'completed' : 'pending',
            }
          : task
      )
    );
  };

  const value = {
    tasks,
    user,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
