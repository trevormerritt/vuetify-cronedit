import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import { terser } from 'rollup-plugin-terser';
import strip from '@rollup/plugin-strip';

export default {
    external: ['vue'],
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'VuetifyCronedit',
        exports: 'named',
        globals: {
            'vue': 'Vue'
        }
    },
    plugins: [
        strip({
            sourceMap: true
        }),
        terser(),
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
    ],
};
