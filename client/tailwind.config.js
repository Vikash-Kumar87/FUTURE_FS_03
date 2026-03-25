/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Manrope", "sans-serif"],
        body: ["DM Sans", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f0fdfa",
          500: "#0d9488",
          600: "#0f766e",
          700: "#115e59"
        },
        accent: {
          500: "#f59e0b",
          600: "#d97706"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.08)",
        glass: "0 12px 40px rgba(15, 23, 42, 0.2)"
      },
      backgroundImage: {
        "mesh-light": "radial-gradient(circle at 10% 20%, rgba(13, 148, 136, 0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(245, 158, 11, 0.2), transparent 45%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        "mesh-dark": "radial-gradient(circle at 15% 15%, rgba(13, 148, 136, 0.25), transparent 35%), radial-gradient(circle at 85% 0%, rgba(245, 158, 11, 0.2), transparent 40%), linear-gradient(140deg, #020617 0%, #0f172a 100%)"
      }
    }
  },
  plugins: []
};
