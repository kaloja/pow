/* Load plugins */
var gulp    = require('gulp');
var header  = require('gulp-header');
var concat  = require('gulp-concat');
var postcss = require('gulp-postcss');
var rename  = require('gulp-rename');
var sass    = require('gulp-sass');
var uglify  = require('gulp-uglify');
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
gulp.task('pow-css', function() {

	return gulp.src('./src/pow.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(header(banner, { package: package }))
		.pipe(gulp.dest('./dist'))
		.pipe(rename('pow.min.css'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss([ prefix({ browsers: ['last 2 versions'] }) ]))
		.pipe(gulp.dest('./dist'));

});

gulp.task('app-css', function() {

	return gulp.src('./docs/assets/css/src/app.scss')
		.pipe(header(banner, { package: package }))
		.pipe(rename('app.min.css'))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss([ prefix({ browsers: ['last 2 versions'] }) ]))
		.pipe(gulp.dest('./docs/assets/css/dist'));

});

/* Scripts */
gulp.task('app-js', function() {

  return gulp.src([
      './docs/assets/js/src/panache.js',
      './docs/assets/js/src/app.js'
    ])
    .pipe(concat('app.js'))
    .pipe(header(banner, { package: package }))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./docs/assets/js/dist'));

});

/* Run Gulp */
gulp.task('default', ['pow-css', 'app-css', 'app-js']);
