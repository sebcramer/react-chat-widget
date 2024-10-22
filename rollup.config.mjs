import commonjs from "@rollup/plugin-commonjs";
import image from '@rollup/plugin-image';
import resolve from "@rollup/plugin-node-resolve";
import { dts } from "rollup-plugin-dts";
import terser from '@rollup/plugin-terser';
import path from "path";
import postcss from "rollup-plugin-postcss";
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { fileURLToPath } from 'url';
import packageJson from "./package.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export default [{
    input: "src/index.tsx",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        image(),
        json({
            compact: true
        }),
        postcss({
            use: {
                sass: {
                    includePaths: [path.resolve(__dirname, 'src/scss/')]
                }
            },
            extract: "styles.css",
            sourceMap: true,
            minimize: true
        }),
        terser()
    ]
},
{
    input: "lib/esm/types/index.d.ts",
    output: [{ file: "lib/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
},
];