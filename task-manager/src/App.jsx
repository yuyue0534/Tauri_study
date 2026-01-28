import React, { useState } from 'react';
import { Plus, LayoutGrid, List, RefreshCw } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import KanbanBoard from './components/KanbanBoard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import { notificationAPI } from './lib/tauri-api';

function App() {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    searchTasks,
    refreshTasks,
  } = useTasks();

  const [viewMode, setViewMode] = useState('kanban');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  React.useEffect(() => {
    notificationAPI.requestPermission();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
    } catch (error) {
      alert('创建任务失败: ' + error.message);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      await updateTask(id, taskData);
    } catch (error) {
      alert('更新任务失败: ' + error.message);
    }
  };

  const handleDeleteTask = async (id) => {
    if (confirm('确定要删除这个任务吗?')) {
      try {
        await deleteTask(id);
      } catch (error) {
        alert('删除任务失败: ' + error.message);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (taskData) => {
    if (editingTask) {
      await handleUpdateTask(editingTask.id, taskData);
    } else {
      await handleCreateTask(taskData);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleSearch = (query) => {
    searchTasks(query);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">任务管理器</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={refreshTasks}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title="刷新"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'kanban' ? 'list' : 'kanban')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                title={viewMode === 'kanban' ? '切换到列表视图' : '切换到看板视图'}
              >
                {viewMode === 'kanban' ? (
                  <List className="w-5 h-5" />
                ) : (
                  <LayoutGrid className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                新建任务
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>总计: <strong>{tasks.length}</strong></span>
              <span>待办: <strong>{tasks.filter(t => t.status === 'todo').length}</strong></span>
              <span>进行中: <strong>{tasks.filter(t => t.status === 'in_progress').length}</strong></span>
              <span>已完成: <strong>{tasks.filter(t => t.status === 'done').length}</strong></span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">加载中...</p>
            </div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-red-600">
              <p className="text-lg font-medium">加载失败</p>
              <p className="mt-2">{error}</p>
              <button
                onClick={refreshTasks}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                重试
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full p-6">
            {viewMode === 'kanban' ? (
              <KanbanBoard
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm h-full overflow-auto">
                <TaskList
                  tasks={tasks}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;
