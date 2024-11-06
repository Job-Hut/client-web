/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        application: {
          submitted: "hsl(var(--application-submitted))",
          interview: "hsl(var(--application-interview))",
          offerLetter: "hsl(var(--application-offerLetter))",
          accepted: "hsl(var(--application-accepted))",
          rejected: "hsl(var(--application-rejected))",
        },
        collection: {
          1: "hsl(var(--collection-1))",
          2: "hsl(var(--collection-2))",
          3: "hsl(var(--collection-3))",
          4: "hsl(var(--collection-4))",
          5: "hsl(var(--collection-5))",
          6: "hsl(var(--collection-6))",
          7: "hsl(var(--collection-7))",
          8: "hsl(var(--collection-8))",
          9: "hsl(var(--collection-9))",
          10: "hsl(var(--collection-10))",
          11: "hsl(var(--collection-11))",
          12: "hsl(var(--collection-12))",
          13: "hsl(var(--collection-13))",
          14: "hsl(var(--collection-14))",
          15: "hsl(var(--collection-15))",
        },
      },
      screens: {
        msm: "320px",
        mmd: "375px",
        mlg: "425px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
