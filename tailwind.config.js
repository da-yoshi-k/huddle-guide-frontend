module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1EB854",
          "secondary": "#1FD65F",
          "accent": "#D99330",
          "neutral": "#86efac",
          "base-100": "#f3f4f6",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
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
