const gulp        = require('gulp');
const sass        = require('gulp-sass');
const del         = require('del');
const inject      = require('gulp-inject-string');
const fs          = require('fs')
const path        = require('path')
const sequence    = require('run-sequence')
const browserify  = require('gulp-browserify');
const babel       = require("gulp-babel");
const deleteLines = require('gulp-delete-lines');

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

  // const css    = fs.readFileSync(paths.css.dest, 'utf8')
  // const tm_stg = fs.readFileSync(paths.js.tmStg, 'utf8')

  // return gulp.src(path.join(paths.js.src,'index.user.js'))
  //   .pipe(inject.replace('{{{css}}}', css))
  //   .pipe(browserify())

  //   // browserify が semi-colon を付けてくれないので、それをカバーするために再度babelを通す
  //   // semi-colon を付けるオプションが有るといいんだけど。。。
  // // .pipe(babel())
  //   .pipe(inject.prepend(tm_stg))

  //   // 不要な行を削除
  //   .pipe(deleteLines({
  //     filters: [
  //       /^"use strict";$/,
  //     ]
  //   }))
  //   .pipe(gulp.dest(path.dirname(paths.js.dest)))
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
