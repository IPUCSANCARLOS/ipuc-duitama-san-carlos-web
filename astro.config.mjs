import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ipucsancarlos.github.io',
  base: '/ipuc-duitama-san-carlos-web/',
  vite: {
    plugins: [tailwindcss()]
  }
});