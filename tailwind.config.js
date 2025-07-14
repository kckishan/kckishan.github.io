// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#1976D2',     // Google Blue 700
        experience: '#388E3C',  // Google Green 700
        publication: '#7B1FA2', // Google Purple 700
        project: '#F57C00',     // Google Orange 700
      }
    },
  },
  plugins: [],
};
