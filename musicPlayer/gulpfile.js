const { src, dest, series, watch } = require('gulp')

const imgmin = require('gulp-imagemin')

const htmlclean = require('gulp-htmlclean')

const uglify = require('gulp-uglify')
const stripdebug = require('gulp-strip-debug')

const less = require('gulp-less')
const postcss = require('gulp-postcss')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')

function html() {
    return src('src/html/*')
        .pipe(htmlclean())
        .pipe(dest('dist/html/'))
}

function css() {
    return src('src/css/*')
        .pipe(less())
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'Firefox ESR'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(dest('dist/css/'))
}

function js() {
    return src('src/js/*')
        .pipe(uglify())
        .pipe(stripdebug())
        .pipe(dest('dist/js/'))
}

function img() {
    return src("src/images/*")
        .pipe(imgmin())
        .pipe(dest("dist/images/"))
}

function defaultTask() {
    // watch(['src/html/*'], series(html));
    // watch(['src/css/*'], series(css));
    // watch(['src/js/*'], series(js));
    // watch(['src/images/*'], series(img));

    return series(html, css, js, img);
}

exports.default = defaultTask()