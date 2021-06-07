let gulp = require('gulp');
let uglify = require('gulp-uglify-es').default;
let concat = require('gulp-concat');

const files = [
    './src/lib/Chart.min.js',
    './src/utils.js',
    './src/CanopyEnhancer.js'
];

async function compile() {
    gulp.src(files)
        .pipe(concat('cge.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
}

gulp.task('default', compile)
gulp.task('compile', compile)
