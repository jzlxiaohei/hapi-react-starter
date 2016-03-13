var gulp = require('gulp');
var sourceMaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var path = require('path');
/**
 * excludePaths是不需要用babel编译的,
 */
var excludePaths = [
        'src/views/**/*','src/public/**/*','src/**/*.json','src/**/*.txt'
]

var paths = {
    es6: [],
    es5: './build',
    sourceRoot: path.join(__dirname, 'src')
};
paths.es6 = excludePaths.map(function(item){
    return "!"+item
}).concat(['src/**/*.js'])


gulp.task('babel-src', function() {
    return gulp.src(paths.es6,{base:'src'})
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: ['stage-3', 'es2015'],
        }))
        .pipe(sourceMaps.write('.', {
            includeContent: false,
            sourceRoot: paths.sourceRoot
        }))
        .pipe(gulp.dest(paths.es5));
});
gulp.task("copy-src",function(){
    return gulp.src(excludePaths,{base:"src"})
        .pipe(gulp.dest(paths.es5));
})


gulp.task("build",['babel-src','copy-src'],function(){})