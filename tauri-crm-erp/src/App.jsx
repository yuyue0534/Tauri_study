import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes';
import { useSettingsStore } from './store';

function App() {
  const { theme, initSettings } = useSettingsStore();

  useEffect(() => {
    // 初始化系统设置
    initSettings();
  }, [initSettings]);

  useEffect(() => {
    // 应用主题
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
