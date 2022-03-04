const gulp = require('gulp');
const webpack = require('webpack-stream');
const rename = require('gulp-rename');

gulp.task('compile-app-js', () => gulp.src([
  'app/assets/javascript/**/*.js',
])
  .pipe(webpack(
    {
      mode: 'production',
      stats: 'errors-only',
    },
  ))
  .pipe(rename('application.min.js'))
  .pipe(gulp.dest('public/javascript/')));
