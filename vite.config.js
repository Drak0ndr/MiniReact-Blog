import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
    plugins: [
        babel({
          babelConfig: {
            plugins: [  [
              "@babel/plugin-transform-react-jsx",
              { runtime: "automatic", importSource: "/miniReact" },
            ],]
          }
        }),
        chunkSplitPlugin(
        {
          strategy: 'default',
          customChunk: (args)=>{
            // files into pages directory is export in single files
            let { file, id, moduleId, root } = args;
            if(file.startsWith('src/pages/*')){
              file = file.substring(4);
              file = file.replace(/\.[^.$]+$/, '');
              return file;
            }
            return null;
          }
        }
        )
    ],
})