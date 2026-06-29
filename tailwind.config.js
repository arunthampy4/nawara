/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./services/*.html",
    "./build-site.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand palette derived from the Nawara logo (water-drop blue + leaf green)
        brand: {
          blue: "#1295D8",
          dark: "#0E6FB0",
          cyan: "#22BCE6",
          teal: "#15B8A6",
          green: "#43B649",
          leaf: "#2FA84F",
        },
        ink: {
          DEFAULT: "#0F1E2E",
          soft: "#1E2D3D",
        },
        slatey: {
          500: "#5B6B7F",
          400: "#7A8AA0",
        },
        mist: {
          50: "#F7FAFD",
          100: "#EEF4FA",
          200: "#E3ECF5",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,30,46,.04), 0 12px 32px -12px rgba(15,30,46,.12)",
        cardHover: "0 1px 2px rgba(15,30,46,.05), 0 24px 48px -16px rgba(18,149,216,.28)",
        float: "0 20px 50px -20px rgba(15,30,46,.35)",
        soft: "0 10px 30px -12px rgba(15,30,46,.18)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1295D8 0%, #16A6C9 48%, #43B649 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(18,149,216,.10) 0%, rgba(67,182,73,.10) 100%)",
      },
      borderRadius: {
        "2xl": "1.1rem",
        "3xl": "1.6rem",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        fadeup: "fadeup .7s ease both",
      },
    },
  },
  plugins: [],
};
