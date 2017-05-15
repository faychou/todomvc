var gulp = require("gulp"),
	cleanCSS = require('gulp-clean-css'),
	uglify = require("gulp-uglify"),
	minifyHtml = require("gulp-minify-html"),
	jshint = require("gulp-jshint"),
	clean = require('gulp-clean'),
	browserSync = require('browser-sync').create();

gulp.task('minify-html', function () {
	return gulp.src('src/*.html')
	.pipe(minifyHtml())
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});


gulp.task('minify-css', function() {
	return gulp.src('src/css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('jsLint', function () {
    gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter())
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('minify-js', function () {
	return gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('clean-file', function () {
	return gulp.src('dist', {read: false})
		.pipe(clean())
		.pipe(browserSync.reload({stream:true}));
});

gulp.task("default",["clean-file","minify-html","minify-css","jsLint","minify-js"]);

gulp.task('serve', ["clean-file","minify-html","minify-css","jsLint","minify-js"], function() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch("src/css/*.css", ['minify-css']);
	gulp.watch("src/js/*.js", ['jsLint','minify-js']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

