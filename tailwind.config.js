/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rmono: ["Roboto-Mono", "sans-serif"],
      },
      colors: {
        primary: "#111111",
        second: "#E3E5E4",
        warning: "#FF2A3B",
        disable: "#777777",
      },
    },
  },
  plugins: [],
};
