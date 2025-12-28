import react from "@vitejs/plugin-react-swc";
import externalGlobals from "rollup-plugin-external-globals";
import { defineConfig } from "vite";
import { copyFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    define: {
      "process.env": {
        NODE_ENV: JSON.stringify(
          command === "build" ? "production" : "development"
        ),
      },
    },
    build: {
      lib: {
        entry: "src/main.ts",
        fileName: "index",
        formats: ["es"],
      },
      rollupOptions: {
        external: ["react", "valtio"],
      },
    },
    plugins: [
      react(), 
      externalGlobals({ react: "React", valtio: "Valtio" }),
      // 自定义插件：复制生成的 CSS 文件到 dist 目录
      {
        name: 'copy-theme-css',
        writeBundle() {
          if (command === 'build') {
            const distDir = 'dist';
            const publicDir = 'public';
            
            // 确保 dist 目录存在
            if (!existsSync(distDir)) {
              mkdirSync(distDir, { recursive: true });
            }
            
            // 复制主题 CSS 文件
            const themeFiles = ['theme-night.css', 'theme-storm.css', 'theme-light.css'];
            
            for (const file of themeFiles) {
              const srcPath = join(publicDir, file);
              const destPath = join(distDir, file);
              
              if (existsSync(srcPath)) {
                try {
                  copyFileSync(srcPath, destPath);
                  console.log(`✅ 已复制主题文件: ${file}`);
                } catch (error) {
                  console.error(`❌ 复制主题文件失败 ${file}:`, error);
                }
              } else {
                console.warn(`⚠️ 主题文件不存在: ${file}`);
              }
            }
          }
        }
      }
    ],
  };
});
