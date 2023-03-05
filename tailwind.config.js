module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4FC662",
          "secondary": "#1FD65F",
          "accent": "#f5ac46",
          "neutral": "#89D996",
          "base-100": "#f3f4f6",
          "info": "#3b82f6",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#fa3e3e",
          "--animation-btn": "0s",
          '.btn-twitter': {
            'background-color': '#1B9DF0',
            'border-color': '#1B9DF0',
          },
          '.btn-twitter:hover': {
            'background-color': '#1B9DF0',
            'border-color': '#1B9DF0',
          },
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
