import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  adapter: vercel({
    functionPerRoute: false, // only works when false
  }),
  integrations: [react()],
  output: 'server',
});
