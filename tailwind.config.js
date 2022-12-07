module.exports = {
  content: [
    "app.vue",
    "./components/**/*.{vue,js,jsx,ts,tsx}",
    "./layouts/**/*.vue",
    "./pages/**/*.{vue,js,jsx,ts,tsx}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
