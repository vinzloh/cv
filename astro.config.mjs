import react from '@astrojs/react';
import vercelServerless from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercelServerless({
    functionPerRoute: false, // only works when false
  }),
  integrations: [react()],
  output: 'server',
});
