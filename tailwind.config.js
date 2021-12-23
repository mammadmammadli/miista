module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        sm: [
          "12px",
          {
            lineHeight: "24px",
          },
        ],
      },
      colors: {
        main: "#E5E5E5",
      },
    },
  },
  plugins: [],
};
