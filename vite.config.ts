import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // Thay đổi thành '/' nếu không chạy trong thư mục con
    base: '/', 
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Chỉ dùng nếu bạn thực sự cần dùng biến process.env trong code React
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        // Alias giúp bạn import từ gốc dễ dàng hơn (ví dụ: import X from '@/src/components/X')
        '@': path.resolve(__dirname, './src'), 
      }
    }
  };
});
