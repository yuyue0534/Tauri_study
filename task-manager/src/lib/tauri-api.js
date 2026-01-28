import { invoke } from '@tauri-apps/api/core';
import { sendNotification, isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';

export const taskAPI = {
  async createTask(taskData) {
    return await invoke('create_task', { input: taskData });
  },

  async getAllTasks() {
    return await invoke('get_all_tasks');
  },

  async getTask(id) {
    return await invoke('get_task', { id });
  },

  async updateTask(id, taskData) {
    return await invoke('update_task', { id, input: taskData });
  },

  async deleteTask(id) {
    return await invoke('delete_task', { id });
  },

  async searchTasks(query) {
    return await invoke('search_tasks', { query });
  },
};

export const notificationAPI = {
  async checkPermission() {
    try {
      return await isPermissionGranted();
    } catch (error) {
      console.warn('Failed to check notification permission:', error);
      return false;
    }
  },

  async requestPermission() {
    try {
      return await requestPermission();
    } catch (error) {
      console.warn('Failed to request notification permission:', error);
      return 'denied';
    }
  },

  async sendNotification(title, body) {
    try {
      const hasPermission = await this.checkPermission();

      if (!hasPermission) {
        const permission = await this.requestPermission();
        if (permission !== 'granted') {
          console.warn('Notification permission denied');
          return;
        }
      }


      await sendNotification({
        title,
        body,
      });
    } catch (error) {
      console.warn('Failed to send notification:', error);
    }
  },

  async notifyTaskDue(task) {
    await this.sendNotification(
      '任务即将到期',
      `任务 "${task.title}" 即将到期！`
    );
  },

  async notifyTaskCreated(task) {
    await this.sendNotification(
      '任务已创建',
      `新任务 "${task.title}" 已创建成功`
    );
  },
};
