const gulp = require('gulp');

gulp.task('copy-assets', () => gulp.src([
  '!app/assets/sass{,/**/*}',
  'app/assets/images{,/**/*}',
  'app/assets/videos{,/**/*}',
])
  .pipe(gulp.dest('public/')));
