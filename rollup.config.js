import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import json from '@rollup/plugin-json';
import sass from 'rollup-plugin-sass';
import pkg from './package.json';

export default {
    input: 'src/index.ts',
    output: [
        {
            format: 'cjs',
            sourcemap: true,
            file: pkg.main,
            globals: { react: 'React' },
        },
    ],
    plugins: [
        typescript(),
        peerDepsExternal(),
        postcss({
            extract: false,
            modules: true,
            use: ['sass'],
        }),
        babel({ exclude: 'node_modules/**' }),
        commonjs({
            include: 'node_modules/**',
            namedExports: {
                'node_modules/react-is/index.js': ['isValidElementType'],
            },
        }),
        sass({ insert: true }),
        json(),
    ],
    external: ['react', 'react-dom'],
};
