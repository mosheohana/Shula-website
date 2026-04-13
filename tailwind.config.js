/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        clay: "#B8603E",
        ember: "#8F3F2C",
        olive: "#60704A",
        moss: "#2F412F",
        linen: "#FAF5ED",
        oat: "#E8D7BD",
        ink: "#28231E"
      },
      fontFamily: {
        display: ["Frank Ruhl Libre", "serif"],
        body: ["Assistant", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(47, 65, 47, 0.14)"
      }
    }
  },
  plugins: []
};
