/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Updated color palette for degen-friendly UI
        primary: "hsl(240, 80%, 60%)", // More vibrant indigo
        accent: "hsl(280, 100%, 65%)", // Vibrant purple
        bg: "hsl(220, 20%, 98%)",
        surface: "hsl(220, 20%, 100%)",
        "text-primary": "hsl(210, 40%, 15%)",
        "text-secondary": "hsl(210, 40%, 45%)",
        border: "hsl(210, 40%, 90%)",
        destructive: "hsl(0, 80%, 50%)",
        
        // Degen-friendly accent colors
        neon: {
          blue: "hsl(210, 100%, 60%)",
          purple: "hsl(280, 100%, 65%)",
          pink: "hsl(330, 100%, 70%)",
          green: "hsl(140, 100%, 60%)",
          yellow: "hsl(50, 100%, 60%)",
        },
        
        // Dark mode colors
        dark: {
          bg: "hsl(220, 20%, 10%)",
          surface: "hsl(220, 20%, 15%)",
          border: "hsl(210, 20%, 25%)",
        },
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        full: "9999px",
      },
      spacing: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "48px",
      },
      boxShadow: {
        card: "0 4px 12px hsla(210, 40%, 10%, 0.1)",
        glow: "0 0 15px rgba(99, 102, 241, 0.5)",
        "glow-lg": "0 0 30px rgba(99, 102, 241, 0.5)",
        "inner-glow": "inset 0 0 15px rgba(99, 102, 241, 0.3)",
      },
      animation: {
        "fade-in": "fadeIn 200ms cubic-bezier(0.22,1,0.36,1)",
        "slide-up": "slideUp 400ms cubic-bezier(0.22,1,0.36,1)",
        "slide-in-right": "slideInRight 400ms cubic-bezier(0.22,1,0.36,1)",
        "slide-in-left": "slideInLeft 400ms cubic-bezier(0.22,1,0.36,1)",
        "bounce-slow": "bounce 3s infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
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
        slideInRight: {
          "0%": { transform: "translateX(20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-20px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shine": "linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1))",
      },
      backgroundSize: {
        "shine": "30px 30px",
      },
    },
  },
  plugins: [],
}
