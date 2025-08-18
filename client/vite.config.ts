// import { exec } from 'node:child_process';
// import { promisify } from 'node:util';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';



// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    // {
    //   name: 'build-script',
    //   buildStart: async () => {
    //     const promisifyExec = promisify(exec);

    //     const { stdout, stderr } = await promisifyExec('npx openapi-codegen gen');
    //     console.log('stdout:', stdout);
    //     console.log('stderr:', stderr);
    //   },
    // },
    react()
  ],
});
