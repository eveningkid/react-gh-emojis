var gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('build', function () {
    return gulp.src(['index.js', 'src/**/*.js'], {base: '.'})
        .pipe(babel({
          presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('build'));
});
