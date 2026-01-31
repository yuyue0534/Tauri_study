import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // 状态
      user: null,
      token: null,
      isAuthenticated: false,

      // 登录
      login: (userData, token) => {
        set({
          user: userData,
          token: token,
          isAuthenticated: true,
        });
      },

      // 登出
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      // 更新用户信息
      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
      },

      // 检查权限
      hasPermission: (module, action) => {
        const { user } = get();
        if (!user) return false;
        
        // 管理员拥有所有权限
        if (user.role === 'admin') return true;
        
        // 这里可以添加更复杂的权限判断逻辑
        // 目前简化处理
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
