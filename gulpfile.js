var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('compile', function() {
    gulp.src([
        './js/src/lib/Chart.min.js',
        './js/src/utils.js',
        './js/src/CanopyEnhancer.js'
    ])
        .pipe(concat('cge.js'))
        .pipe(gulp.dest('./js/build/'))
});