import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      "lofi",
      {
        ifol: {
          ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
          primary: "#ffffff",
          secondary: "#ffffff",
          accent: "#ffffff",
          neutral: "#ffffff",
          "base-100": "#111111",
          "base-200": "#222222",
          "base-300": "#333333",
          "base-content": "#eeeeee",
          info: "#ffffff",
          success: "#ffffff",
          warning: "#ffffff",
          error: "#ffffff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config
