/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Example: 'primary': '#YOUR_PRIMARY_COLOR_HERE',
        // TODO: Define accessible color palette
      },
      fontFamily: {
        // Example: 'sans': ['Your Preferred Sans Serif', 'system-ui'],
        // TODO: Define project typography
      }
    },
  },
  plugins: [],
}
