import { defineConfig } from 'vite';

// GitHub Pages에서 하위 경로로 배포되어도 동작하도록 상대 경로를 씁니다.
export default defineConfig({
  base: './',
  build: { outDir: 'dist', sourcemap: false },
});
