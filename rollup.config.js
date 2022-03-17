import { babel } from '@rollup/plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
    input: 'example/barcode/index.js',
    // plugins,  
    output: {
      // 核心选项
      file: 'dist/bundle.js',    // 必须
      format: 'esm',  // 必须
    },
    plugins: []
  };