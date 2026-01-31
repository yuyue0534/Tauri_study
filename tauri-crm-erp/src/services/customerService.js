import api from './api';

/**
 * 客户管理服务
 */
export const customerService = {
  /**
   * 获取客户列表
   * @param {object} params - 查询参数 {page, page_size, search, level, status}
   */
  async getCustomers(params = {}) {
    return api.get('get_customers', {
      page: params.page || 1,
      page_size: params.pageSize || 20,
      search: params.search || '',
      level: params.level || '',
      status: params.status || 'active',
    });
  },

  /**
   * 根据ID获取客户详情
   * @param {number} id - 客户ID
   */
  async getCustomerById(id) {
    return api.get('get_customer_by_id', { id });
  },

  /**
   * 创建客户
   * @param {object} customerData - 客户数据
   */
  async createCustomer(customerData) {
    return api.post('create_customer', customerData);
  },

  /**
   * 更新客户
   * @param {number} id - 客户ID
   * @param {object} customerData - 客户数据
   */
  async updateCustomer(id, customerData) {
    return api.put('update_customer', { id, data: customerData });
  },

  /**
   * 删除客户
   * @param {number} id - 客户ID
   */
  async deleteCustomer(id) {
    return api.delete('delete_customer', { id });
  },

  /**
   * 获取客户跟进记录
   * @param {number} customerId - 客户ID
   */
  async getFollowups(customerId) {
    return api.get('get_followups', { customer_id: customerId });
  },

  /**
   * 创建跟进记录
   * @param {object} followupData - 跟进数据
   */
  async createFollowup(followupData) {
    return api.post('create_followup', followupData);
  },

  /**
   * 导出客户数据
   * @param {object} params - 导出参数
   */
  async exportCustomers(params = {}) {
    return api.post('export_customers', params);
  },
};

export default customerService;
