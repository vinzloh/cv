import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercelServerless from '@astrojs/vercel/serverless';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercelServerless({
    functionPerRoute: false,
  }),
  integrations: [react(), tailwind()],
  output: 'server',
});
