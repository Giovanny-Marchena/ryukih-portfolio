const fs = require('fs');
const Terser = require('terser');
const CleanCSS = require('clean-css');

// Minify CSS
const cssInput = fs.readFileSync('public/css/style.css', 'utf8');
const cssOutput = new CleanCSS().minify(cssInput).styles;
fs.writeFileSync('public/css/style.min.css', cssOutput);

// Minify JS
const jsInput = fs.readFileSync('public/js/main.js', 'utf8');
Terser.minify(jsInput).then(result => {
    fs.writeFileSync('public/js/main.min.js', result.code);
});