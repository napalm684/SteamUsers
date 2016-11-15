var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('default', ['copy-libs', 'copy-fonts', 'copy-styles', 'copy-json', 'build']);

gulp.task('copy-libs', function(){
    return gulp.src(['node_modules/jquery/dist/jquery.js',
                     'node_modules/materialize-css/dist/js/materialize.js',
                     'node_modules/requirejs/require.js',
                     'node_modules/hammerjs/hammer.js'])
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('copy-fonts', function(){
    return gulp.src(['node_modules/materialize-css/dist/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-styles', function(){
   return gulp.src(['node_modules/materialize-css/dist/css/materialize.css',
                    'src/styles/styles.css'])
       .pipe(gulp.dest('dist/styles'));
});

gulp.task('copy-json', function(){
    return gulp.src(['src/users.json'])
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function(){
   var tsProject = ts.createProject('tsconfig.json');

   var tsResult = tsProject.src()
       .pipe(sourcemaps.init())
       .pipe(tsProject());

   return tsResult.js
       .pipe(sourcemaps.write('./'))
       .pipe(gulp.dest('./'));
});

gulp.task('clean', function(){
    return gulp.src('dist')
        .pipe(clean(), {read: false});
});