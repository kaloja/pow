/* Load plugins */
var gulp    = require('gulp');
var header  = require('gulp-header');
var postcss = require('gulp-postcss');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
var prefix  = require('autoprefixer');
var package = require('./package.json');

/* Banner */
var banner = [

	'/*! ',
	'<%= package.title %> |',
	' v<%= package.version %> |',
	' <%= package.author %>',
	' */',
	'\n'

].join('');

/* Styles */
gulp.task('app-css', function() {

	return gulp.src('./src/pow.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(header(banner, { package: package }))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('pow.min.css'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss([ prefix({ browsers: ['last 2 versions'] }) ]))
		.pipe(gulp.dest('./dist'));

});

/* Run Gulp */
gulp.task('default', ['app-css']);
