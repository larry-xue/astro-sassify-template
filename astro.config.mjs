// @ts-check
import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    alpinejs(),
    // Icons are inlined as SVG at build time — no runtime, no CDN request.
    icon({ include: { lucide: ['*'] } })
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});