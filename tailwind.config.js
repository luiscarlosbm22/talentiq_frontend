const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'celular': '376px',
      // => @media (min-width: 425px) { ... }
    },
    extend: {},
  },
  plugins: [],
});

