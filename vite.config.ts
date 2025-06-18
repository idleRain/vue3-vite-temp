import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'node:path'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import ViteJson5 from 'vite-plugin-json5'

// https://vite.dev/config/
export default ({ mode }: { mode: string; command: string }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    plugins: [
      vue(),
      tailwindcss(),
      ViteJson5(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        dts: 'typings/auto-imports.d.ts',
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.js',
          globalsPropValue: true
        }
      }),
      Components({
        dirs: [resolve(__dirname, 'src/components/**')],
        extensions: ['vue'],
        dts: true,
        resolvers: [ElementPlusResolver()]
      })
    ],
    server: {
      port: Number(env.VITE_SERVER_PORT),
      host: '0.0.0.0',
      proxy: {
        [env.VITE_BASE_URL]: {
          target: env.VITE_PROXY_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(new RegExp(`^${env.VITE_BASE_URL}`), '')
        }
      }
    },
    css: {
      postcss: './postcss.config.js'
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~': resolve(__dirname, './'),
        $ui: resolve(__dirname, './src/components/ui')
      }
    },
    build: {
      sourcemap: mode === 'dev',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  })
}
