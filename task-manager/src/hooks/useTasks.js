import { useState, useEffect, useCallback } from 'react';
import { taskAPI, notificationAPI } from '../lib/tauri-api';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const allTasks = await taskAPI.getAllTasks();
      setTasks(allTasks);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = useCallback(async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      await notificationAPI.notifyTaskCreated(newTask);
      return newTask;
    } catch (err) {
      setError(err.message);
      console.error('Failed to create task:', err);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(id, taskData);
      setTasks(prev => 
        prev.map(task => task.id === id ? updatedTask : task)
      );
      return updatedTask;
    } catch (err) {
      setError(err.message);
      console.error('Failed to update task:', err);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await taskAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete task:', err);
      throw err;
    }
  }, []);

  const searchTasks = useCallback(async (query) => {
    try {
      if (!query.trim()) {
        await loadTasks();
        return;
      }
      const results = await taskAPI.searchTasks(query);
      setTasks(results);
    } catch (err) {
      setError(err.message);
      console.error('Failed to search tasks:', err);
    }
  }, [loadTasks]);

  const tasksByStatus = useCallback(() => {
    return {
      todo: tasks.filter(t => t.status === 'todo'),
      in_progress: tasks.filter(t => t.status === 'in_progress'),
      done: tasks.filter(t => t.status === 'done'),
    };
  }, [tasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    const checkDueTasks = () => {
      const now = new Date();
      const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

      tasks.forEach(task => {
        if (task.due_date && task.status !== 'done') {
          const dueDate = new Date(task.due_date);
          if (dueDate > now && dueDate <= oneDayLater) {
            notificationAPI.notifyTaskDue(task);
          }
        }
      });
    };

    const interval = setInterval(checkDueTasks, 60 * 60 * 1000);
    checkDueTasks();

    return () => clearInterval(interval);
  }, [tasks]);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refreshTasks: loadTasks,
    tasksByStatus,
  };
}
