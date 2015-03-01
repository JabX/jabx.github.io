var gulp = require('gulp');

var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var externals = [
    'lodash',
    'react-swipe',
    'react/addons',
    'reflux'
];

gulp.task('vendor', function() {
    var bundler = browserify({ debug: true })
        .require(externals);

    return bundler.bundle()
        .pipe(source('vendor.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function() {
    var bundler = browserify({ debug: true })
        .require(require.resolve('./app/app.jsx'), { entry: true })
        .transform(reactify)
        .external(externals);

    return bundler.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('all', function () { gulp.start('default', 'vendor'); });