var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
const babel = require('gulp-babel');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

var fontName = 'planer-icons';

gulp.task('iconfont', function(){
    gulp.src(['dist/img/icons/*.svg'])
        .pipe(iconfontCss({
            fontName: fontName,
            path: 'dist/templates/_icons.scss',
            targetPath: '../../dist/sass/_planer-icons.scss',
            fontPath: '../fonts/'
        }))
        .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true,
        }))
        .pipe(gulp.dest('server/asset/fonts/'));
});

gulp.task('sass', function () {
  return gulp.src('dist/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions','>1%','ie 9']))
    .pipe(gulp.dest('server/asset/css'));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('dist/img/sprite/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss',
        imgPath: '../img/sprite.png',
    }));

    var imgStream = spriteData.img
    .pipe(gulp.dest('server/asset/img/'));
 
    var cssStream = spriteData.css
    .pipe(gulp.dest('dist/sass/'));

    return merge(imgStream, cssStream);
});

gulp.task('babel', function () {
    return gulp.src('dist/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('server/asset/js/'));
});

gulp.task('watch', ['sass', 'babel'], function(){
	gulp.watch('dist/sass/**/*.scss', ['sass']);
	gulp.watch('dist/js/*.js', ['babel']);
})