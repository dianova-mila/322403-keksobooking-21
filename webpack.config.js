const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/pin.js",
    "./js/pins.js",
    "./js/card.js",
    "./js/error.js",
    "./js/success.js",
    "./js/server.js",
    "./js/validators.js",
    "./js/form.js",
    "./js/map.js",
    "./js/filters.js",
    "./js/page.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
