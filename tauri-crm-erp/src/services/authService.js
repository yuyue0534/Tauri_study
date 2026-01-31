import api from './api';

/**
 * 认证服务
 */
export const authService = {
  /**
   * 用户登录
   * @param {string} username - 用户名
   * @param {string} password - 密码
   * @returns {Promise<{user: object, token: string}>}
   */
  async login(username, password) {
    return api.post('login', { username, password });
  },

  /**
   * 用户登出
   */
  async logout() {
    return api.post('logout');
  },

  /**
   * 获取当前用户信息
   */
  async getCurrentUser() {
    return api.get('get_current_user');
  },

  /**
   * 修改密码
   * @param {string} oldPassword - 旧密码
   * @param {string} newPassword - 新密码
   */
  async changePassword(oldPassword, newPassword) {
    return api.post('change_password', {
      old_password: oldPassword,
      new_password: newPassword,
    });
  },

  /**
   * 获取用户列表
   * @param {object} params - 查询参数
   */
  async getUsers(params = {}) {
    return api.get('get_users', params);
  },

  /**
   * 创建用户
   * @param {object} userData - 用户数据
   */
  async createUser(userData) {
    return api.post('create_user', userData);
  },

  /**
   * 更新用户
   * @param {number} id - 用户ID
   * @param {object} userData - 用户数据
   */
  async updateUser(id, userData) {
    return api.put('update_user', { id, data: userData });
  },

  /**
   * 删除用户
   * @param {number} id - 用户ID
   */
  async deleteUser(id) {
    return api.delete('delete_user', { id });
  },
};

export default authService;
