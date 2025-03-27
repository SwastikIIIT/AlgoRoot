/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
      extend: {
        animation: {
          aurora: "aurora 60s linear infinite"
        },
        keyframes: {
          aurora: {
            "0%": { backgroundPosition: "50% 50%, 50% 50%" },
            "100%": { backgroundPosition: "350% 50%, 350% 50%" }
          }
        },
        
      },
    },
    plugins: [],
  }