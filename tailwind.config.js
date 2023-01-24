module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4FC662",
          "secondary": "#1FD65F",
          "accent": "#D99330",
          "neutral": "#89D996",
          "base-100": "#f3f4f6",
          "info": "#3b82f6",
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
    "./pages/**/*.{vue,ts,js,jsx,tsx}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#455A64',
        white: '#f3f4f6',
      },
      blur: {
        xs: '0.5px',
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
