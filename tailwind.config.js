/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in-out infinite",
        scanning: "scanning 1000ms ease infinite alternate",
        countdown: "countdown 3500ms ease 1 alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scanning: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-175%)" },
        },
        countdown: {
          "0%": { transform: "translateY(35%)"},
          "30%": { transform: "translateY(35%)"},
          "35%": { transform: "translateY(0%)"},
          "60%": { transform: "translateY(0%)"},
          "65%": { transform: "translateY(-35%)"},
          "90%": { transform: "translateY(-35%)"},
          "100%": { transform: "translateY(-35%)"},
        },
      },
    },
  },
  plugins: [],
};
