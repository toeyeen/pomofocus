// tailwind.config.ts
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanami: ['Nanami-Book', 'sans-serif'],
        centuryGothic: ['CenturyGothic', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
