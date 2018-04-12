let gulp = require('gulp');
let uglify = require('gulp-uglify-es').default;
let concat = require('gulp-concat');

gulp.task('compile', function() {
    gulp.src([
        './src/lib/Chart.min.js',
        './src/utils.js',
        './src/CanopyEnhancer.js'
    ])
        .pipe(concat('cge.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
});