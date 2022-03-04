const gulp = require('gulp');

gulp.task('watch-sass', (done) => gulp.watch([
  'app/assets/sass/**/*.scss',
  'app/components/**/*.scss',
], gulp.task('sass'), done()));

gulp.task('watch-assets', (done) => gulp.watch([
  'app/assets/images/**',
  'app/assets/videos/**',
  'app/components/**',
  'app/assets/javascript/**'],
{ cwd: './' },
gulp.series('copy-assets', 'compile-app-js'), done()));
