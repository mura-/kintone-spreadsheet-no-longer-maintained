import config from './config';
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import notify from 'gulp-notify';
import handleErrors from './util/handleErrors';
import exec from 'gulp-exec';
import haml from 'gulp-ruby-haml' ;
import watch from 'gulp-watch';
import sass from 'gulp-sass';

const BROWSERIFY_OPTIONS = {
  entries: config.js.entries,
  extensions: ['.js'],
  transform: ['babelify'],
  debug: true
}

var watching = false;
gulp.task('enable-watch-mode', ()=> watching = true);

var createTask = function(entries, dest){
  let bundler = browserify({
    entries: entries,
    extensions: ['.js'],
    transform: ['babelify'],
    debug: true
  });

  if (watching) {
    bundler = watchify(bundler);
    bundler.on('update', () => {
      rebundle();
      gulp.start('buildPlugin');
    });
  }
  rebundle();

  function rebundle() {
    bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source(dest))
    .pipe(gulp.dest(config.js.destDir))
    .pipe(exec(config.plugin.compiler + ' ' + config.plugin.srcDir + ' ' + config.plugin.key))
    .pipe(notify(dest + " Compile Succeed!"));
  }
};

gulp.task('js', () => {
  // Generate sub tasks
  config.js.entries.forEach((m) => {
      gulp.task("browserify:" + m, createTask([config.js.srcDir + m], m));
  });

  // Generate main task
  var tasks = config.js.entries.map((app) => {
    return "browserify:" + app;
  });
  gulp.task('browserify', tasks);
  return gulp.start('browserify');
});

gulp.task('buildPlugin', () => {
  gulp.src(config.srcBase + 'manifest.json')
  .pipe(gulp.dest(config.destBase))
  .pipe(exec(config.plugin.compiler + ' ' + config.plugin.srcDir + ' ' + config.plugin.key));
});

gulp.task('haml', () => {
  return gulp.src(config.html.srcDir + '*.haml')
  .pipe(haml())
  .pipe(gulp.dest(config.html.destDir))
  .pipe(notify("Haml Compile Succeed!"));
});

gulp.task('sass', () => {
  return gulp.src(config.css.srcDir + '*.scss')
  .pipe(sass())
  .pipe(gulp.dest(config.css.destDir))
  .pipe(notify("Sass Compile Succeed!"));
});

gulp.task('build', ['js', 'haml', 'sass'], () => {
  gulp.start('buildPlugin');
})

gulp.task('dev', ['enable-watch-mode'],  () => {
  gulp.start('js');
  gulp.watch(config.html.srcDir + '*.haml', ['build']);
  gulp.watch(config.css.srcDir + '*.scss', ['build']);
  gulp.watch(config.srcBase + 'manifest.json', ['build']);
});
