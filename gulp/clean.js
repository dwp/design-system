const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean', () => {
  return gulp.src('public')
  .pipe(clean());
});
