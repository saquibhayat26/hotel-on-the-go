/** @type {import('tailwindcss').Config} */
export default {
  // specify file types to apply tailwind css
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // add custom colors
    extend: {
      colors: {
        backgroundColor: {
          white: "#ffffff",
          normal: "#6366f1",
          lightGray: "#f3f4f6",
          darkGrey: "#a1a1aa",
          darkBlue: "#1e3a8a",
          lightBlue: "#3b82f6",
          lightGreen: "#10b981",
          lightRed: "#ef4444",
          lightYellow: "#facc15",
          lightPurple: "#855f7",
          lightOrange: "#fb923c",
          lightPink: "#f472b6",
          lightBrown: "#a16207",
          lightCyan: "#22d3ee",
          lightTeal: "#2dd4bf",
        },
        textColor: {
          white: "#ffffff",
          inverted: "#6366f1",
          darkGrey: "#a1a1aa",
          darkBlue: "#1e3a8a",
          lightBlue: "#3b82f6",
          lightGreen: "#10b981",
          lightRed: "#ef4444",
          lightYellow: "#facc15",
          lightPurple: "#855f7",
          lightOrange: "#fb923c",
          lightPink: "#f472b6",
          lightBrown: "#a16207",
          lightCyan: "#22d3ee",
          lightTeal: "#2dd4bf",
          lightGray: "#f3f4f6",
        },
      },
    },
    // override default tailwind css
    container: {
      padding: "10rem",
    },
  },
  plugins: [],
};
