/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'ipad': '1024px', // Custom breakpoint for iPad
      },
      fontFamily:{
        inter:["Inter"],
        mid:["Inter"],
        dm:["DM Sans"],
      },
      colors: {
        'custom-purple': '#8E5ACC',
        'custom-purple2': '#AC7CE5',
        'custom-purple3': '#CDA3FF',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
