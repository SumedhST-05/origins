/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        origins: {
          bg: "#FFFFFF",
          surface: "#F5F4F0",
          card: "#FAFAF8",
          text: "#111111",
          muted: "#777777",
          border: "#E6E4E0",
          brown: "#8B5E3C",
          "brown-dark": "#63452F",
          "brown-light": "#A67C5B",
          "brown-subtle": "#F7F2EE",
        },
        brown: {
          50: "#FAF6F3",
          100: "#F7F2EE",
          200: "#E8DDD4",
          300: "#D3BEB0",
          400: "#B49581",
          500: "#8B5E3C", // Primary warm brown accent
          600: "#744B2E",
          700: "#63452F", // Dark brown
          800: "#4D3422",
          900: "#362316",
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        editorial: ['"Syne"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
        tightest: '-.05em',
        ultra: '-.07em',
      },
      boxShadow: {
        'origins': '0 20px 40px -15px rgba(17, 17, 17, 0.05)',
        'origins-hover': '0 25px 50px -12px rgba(139, 94, 60, 0.1)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
