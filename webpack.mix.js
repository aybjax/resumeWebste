const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/painting.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/notebook.scss', 'public/css')
    .sass('resources/sass/parts/navbar.scss', 'public/css')
    .sass('resources/sass/about-resume.scss', 'public/css')
    .sass('resources/sass/painting.scss', 'public/css');