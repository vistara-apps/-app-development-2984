/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(210, 80%, 50%)",
        accent: "hsl(45, 100%, 50%)",
        bg: "hsl(220, 20%, 98%)",
        surface: "hsl(220, 20%, 100%)",
        "text-primary": "hsl(210, 40%, 15%)",
        "text-secondary": "hsl(210, 40%, 45%)",
        border: "hsl(210, 40%, 90%)",
        destructive: "hsl(0, 80%, 50%)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
      spacing: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        card: "0 4px 12px hsla(210, 40%, 10%, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 200ms cubic-bezier(0.22,1,0.36,1)",
        "slide-up": "slideUp 400ms cubic-bezier(0.22,1,0.36,1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
}