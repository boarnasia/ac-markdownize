const gulp        = require('gulp')
const sass        = require('gulp-sass')
const del         = require('del')
const inject      = require('gulp-inject-string')
const fs          = require('fs')
const path        = require('path')
const sequence    = require('run-sequence')
const browserify  = require('gulp-browserify')
const babel       = require("gulp-babel")
const deleteLines = require('gulp-delete-lines')
const jest        = require('gulp-jest').default

const pj_path = __dirname

const paths = {
  css: {
    src: `${pj_path}/css/source/index.scss`,
    dest: `${pj_path}/css/build/index.css`,
  },
  js: {
    src: `${pj_path}/js/source/`,
    dest: `${pj_path}/release/index.user.js`,
    build: {
      babel: `${pj_path}/js/build/babel/`,
    },
    tests: `${pj_path}/js/tests/`,
    test_env: `${pj_path}/js/tests/localStorage.mock.js`,
    tmStg: `${pj_path}/js/source/tempermonkey-settings.js`,
  }
}

gulp.task('scss', cb => {
  return gulp.src(paths.css.src)
    .pipe(sass())
    .pipe(gulp.dest(path.dirname(paths.css.dest)))
})

gulp.task('babel', cb => {
  const css    = fs.readFileSync(paths.css.dest, 'utf8')

  return gulp.src(paths.js.src + '**/*.js')
    .pipe(inject.replace('{{{css}}}', css))
    .pipe(babel())
    .pipe(gulp.dest(paths.js.build.babel))
})

gulp.task('browserify', cb => {

  const tm_stg = fs.readFileSync(paths.js.tmStg, 'utf8')

  return gulp.src(path.join(paths.js.build.babel,'index.user.js'))
    .pipe(browserify())
    .pipe(inject.prepend(tm_stg))
    .pipe(gulp.dest(path.dirname(paths.js.dest)))
})

gulp.task('js', cb => {
  sequence('babel', 'browserify', cb)
})

gulp.task('test', cb => {
  return gulp.src(paths.js.tests)
    .pipe(jest({
      verbose: true,
      automock: false,
      browser: true,
      setupFiles: [
        "jest-localstorage-mock"
      ]
    }));
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
