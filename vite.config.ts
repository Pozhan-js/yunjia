import { defineConfig } from 'vite'
import postcss from './postcss.config.cjs'
import react from '@vitejs/plugin-react'
import path from "path"
import nodePolyfills from "rollup-plugin-polyfill-node";


const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
    // global: {},
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@mui/styled-engine': '@mui/styled-engine-sc'
        },
    },
    define: {
        'process.env': process.env
    },
    css: {
        postcss
    },
    plugins: [react(),
    !production &&
    nodePolyfills({
        include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
    }),
    ],

    server: {
        port: 5276
    },
    build: {
        //浏览器兼容性  "esnext"|"modules"
        //target: "modules",
        //指定输出路径
        outDir: "dist",
        //生成静态资源的存放路径
        assetsDir: "assets",
        //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
        assetsInlineLimit: 4096,
        //启用/禁用 CSS 代码拆分
        cssCodeSplit: true,
        //构建后是否生成 source map 文件
        sourcemap: false,
        //当设置为 true，构建后将会生成 manifest.json 文件
        manifest: false,
        // 设置为 false 可以禁用最小化混淆，
        // 或是用来指定使用哪种混淆器
        // boolean | 'terser' | 'esbuild'
        // minify: "terser", //terser 构建后文件体积更小
        //传递给 Terser 的更多 minify 选项。
        terserOptions: {},
        //设置为 false 来禁用将构建后的文件写入磁盘
        write: true,
        //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
        emptyOutDir: true,
        //chunk 大小警告的限制
        chunkSizeWarningLimit: 500,
        //自定义底层的 Rollup 打包配置
        rollupOptions: {
            plugins: [
                // ↓ Needed for build
                nodePolyfills()
            ],
            output: {
                // 最小化拆分包
                // manualChunks: (id) => {
                //     if (id.includes('node_modules')) {
                //         return id.toString().split('node_modules/')[1].split('/')[0].toString();
                //     }
                // },
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        //console.log('manualChunks id:', id);
                        let name = id.toString().split('node_modules/')[1].split('/')[0].toString();
                        if (name === 'lodash') {
                            return 'lodash';
                        } else if (name === 'web3') {
                            return 'web3';
                        } else
                            return "vendor";
                    }
                },
                entryFileNames: 'static/js/[name].[hash].js',
                chunkFileNames: 'static/js/[name].[hash].js',
                assetFileNames: 'static/[ext]/[name].[hash].[ext]',
                // assetFileNames: (info) => {
                //     const [name, ext] = path.basename(info.name).split('.');
                //     //return `static/[ext]/${name}.[hash].[ext]`
                //     return `static/[ext]/${staticNameEncode(name).toLocaleLowerCase()}.[hash].[ext]`
                // },
                // chunkFileNames: (info) => {
                //     //return `static/js/${info.name}.[hash].js`
                //     return `static/js/${staticNameEncode(info.name).toLocaleLowerCase()}.[hash].js`
                // }
            },
        },
        //@rollup/plugin-commonjs 插件的选项
        commonjsOptions: {
            transformMixedEsModules: true,
        }
    }
})
