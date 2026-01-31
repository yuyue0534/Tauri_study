import { invoke } from '@tauri-apps/api/core';

/**
 * Tauri API 客户端封装
 * 统一处理所有与后端的通信
 */
class ApiClient {
  /**
   * 调用 Tauri 命令
   * @param {string} command - 命令名称
   * @param {object} args - 命令参数
   * @returns {Promise<any>} 返回数据
   */
  async call(command, args = {}) {
    try {
      console.log(`[API] Calling: ${command}`, args);
      const response = await invoke(command, args);
      console.log(`[API] Response: ${command}`, response);
      
      // 检查响应格式
      if (response && typeof response === 'object') {
        if (response.success === false) {
          throw new Error(response.error || '操作失败');
        }
        return response.data !== undefined ? response.data : response;
      }
      
      return response;
    } catch (error) {
      console.error(`[API Error] ${command}:`, error);
      throw error;
    }
  }

  /**
   * GET 请求封装
   */
  async get(command, params = {}) {
    return this.call(command, params);
  }

  /**
   * POST 请求封装
   */
  async post(command, data = {}) {
    return this.call(command, data);
  }

  /**
   * PUT 请求封装
   */
  async put(command, data = {}) {
    return this.call(command, data);
  }

  /**
   * DELETE 请求封装
   */
  async delete(command, params = {}) {
    return this.call(command, params);
  }
}

// 导出单例
export default new ApiClient();
