var gulp			= require('gulp'),
	rigger			= require('gulp-rigger'),
	pug				= require('gulp-pug'),
	plumber			= require('gulp-plumber'),
	postcss			= require('gulp-postcss'),
	autoprefixer	= require('autoprefixer');
	uglifyJS		= require('gulp-uglify'),
	imagemin		= require('gulp-imagemin'),
	cache			= require('gulp-cache'),
	minifyCSS		= require('gulp-minify-css'),
	uglifyCSS		= require('gulp-uglifycss'),
	stylus			= require('gulp-stylus'),
	runSequence		= require('run-sequence'),
	browserSync		= require('browser-sync');



var sourcePath= 	'./src',
	buildPath=		'./build';



var path= {
	src: {
		pug:		sourcePath + '/templates/*.pug',
		stylus: 	sourcePath + '/styles/*.styl',
		css: 		sourcePath + '/styles/ext_css/*.css',
		js: 		sourcePath + '/scripts/*.js',
		images: 	sourcePath + '/images/**/*.*',
		fonts: 		sourcePath + '/fonts/**/*.*'
	},
	build: {
		html: 		buildPath + '/',
		styles: 	buildPath + '/styles/',
		scripts: 	buildPath + '/scripts/',
		images: 	buildPath + '/images/',
		fonts: 		buildPath + '/fonts/'
	},
	watch: {
		pug:		sourcePath + '/templates/**/*.pug',
		stylus: 	sourcePath + '/styles/**/*.styl',
		css: 		sourcePath + '/styles/ext_css/**/*.css',
		js: 		sourcePath + '/scripts/**/*.js',
		images: 	sourcePath + '/images/**/*.*',
		fonts: 		sourcePath + '/fonts/**/*.*'
	}
}; +



gulp.task('browser-sync', function() {
	browserSync({
		// browser: "google chrome",
		open: false, 					// Stop the browser from automatically opening
		ghostMode: false, 				// Clicks, Scrolls & Form inputs on any device will be mirrored to all others
		scrollProportionally: false, 	// Sync viewports to TOP position
		server: {
			baseDir: buildPath
		},
		port: 8088,
		open: true
	});
});


gulp.task('bs-reload', function () {
	browserSync.reload();
});


gulp.task('templates', function(){
	gulp.src(path.src.pug)
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(rigger())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.reload({stream:true}))
});



gulp.task('styles', function(){
	gulp.src(path.src.stylus)
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(rigger())
		.pipe(stylus({
			'include css': true
		}))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(gulp.dest(path.build.styles))
		.pipe(browserSync.reload({stream:true}))
});




gulp.task('scripts', function(){
	gulp.src(path.src.js)
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(rigger())
		.pipe(gulp.dest(path.build.scripts))
		.pipe(browserSync.reload({stream:true}))
});




gulp.task('images', function(){
	gulp.src(path.src.images)
		// .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(path.build.images))
		.pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(browserSync.reload({stream:true}));
});




gulp.task('build', function(){
	runSequence(
		['templates'],
		// ['styles'],
		// ['scripts'],
		// ['images'],
		['minify'],
		['fonts']
		// ['default']
	);
});


// Only for production
gulp.task('minify', function(){
	// minify and uglify scripts
	gulp.src(path.src.scripts)
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(rigger())
		.pipe(uglifyJS())
		.pipe(gulp.dest(path.build.scripts));
	
	// optimize images 
	gulp.src(path.src.images)
		.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
		.pipe(gulp.dest(path.build.images));

	// optimize styles
	gulp.src(path.src.stylus)
		.pipe(plumber({
			errorHandler: function (error) {
				console.log(error.message);
				this.emit('end');
		}}))
		.pipe(rigger())
		.pipe(stylus({
			'include css': true
		}))
		.pipe(postcss([ autoprefixer() ]))
		.pipe(minifyCSS())
		.pipe(uglifyCSS())
		.pipe(gulp.dest(path.build.styles));
});



gulp.task('default', ['browser-sync'], function(){
	runSequence(
		['templates'],
		['styles'],
		['scripts'],
		['images'],
		['fonts']
		// ['default']
	);
	gulp.watch( path.watch.pug, 	['templates']);
	gulp.watch( path.watch.stylus, 	['styles']);
	gulp.watch( path.watch.css, 	['styles']);
	gulp.watch( path.watch.js, 		['scripts']);
	gulp.watch( path.watch.images, 	['images']);
	gulp.watch( path.watch.fonts, 	['fonts']);
});