/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // ✅ Add DaisyUI here
  daisyui: {
    themes: 
    ("light",
    "dark",
    "cupcake", "retro")
  }
};

