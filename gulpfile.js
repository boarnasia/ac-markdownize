const gulp     = require('gulp');
const sass     = require('gulp-sass');
const del      = require('del');
const inject   = require('gulp-inject-string');
const fs       = require('fs')
const path     = require('path')
const sequence = require('run-sequence')

const pj_path = __dirname

const paths = {
  css: {
    src: `${pj_path}/css/source/index.scss`,
    dest: `${pj_path}/css/build/index.css`,
  },
  js: {
    src: `${pj_path}/js/source/index.js`,
    dest: `${pj_path}/release/index.js`,
  }
}

gulp.task('scss', cb => {
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(gulp.dest(path.dirname(paths.css.dest)))
})

gulp.task('js', cb => {
  const css = fs.readFileSync(paths.css.dest, 'utf8')

  return gulp.src(paths.js.src)
    .pipe(inject.replace('{{{css}}}', css))
    .pipe(gulp.dest(path.dirname(paths.js.dest)))
})

gulp.task('clean', cb => {
  del([
    path.dirname(paths.css.dest) + '/**'
  ]).then(paths => {
    console.log('Files and folders that would be deleted:')

    for (const idx in paths) {
      console.log(`- ${paths[idx]}`)
    }
  })
})

gulp.task('dist-clean', cb => {
  gulp.start('clean')

  del([
    './node_modules/**',
    './package-lock.json',
    './**/.DS_Store',
  ]).then(paths => {
    for (const idx in paths) {
      console.log(`- ${paths[idx]}`)
    }
  })
})

gulp.task('default', cb => {
  sequence('scss', 'js', cb)
});
