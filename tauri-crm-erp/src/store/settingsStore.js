import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set) => ({
      // 主题设置
      theme: 'light', // light | dark
      
      // 系统配置
      config: {
        companyName: 'CRM/ERP 管理系统',
        stockWarningEnabled: true,
        defaultExportPath: '',
      },

      // 切换主题
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        }));
      },

      // 设置主题
      setTheme: (theme) => {
        set({ theme });
      },

      // 更新配置
      updateConfig: (newConfig) => {
        set((state) => ({
          config: { ...state.config, ...newConfig },
        }));
      },

      // 初始化设置
      initSettings: async () => {
        // 可以从后端加载配置
        // 这里使用本地存储的配置
      },
    }),
    {
      name: 'settings-storage',
    }
  )
);
