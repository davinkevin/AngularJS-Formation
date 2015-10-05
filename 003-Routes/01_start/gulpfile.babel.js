// Include gulp and Our Plugins

import gulp from 'gulp';
import jshint from 'gulp-jshint';
import less from 'gulp-less';
import minifyCSS from 'gulp-minify-css';
import ngAnnotate from 'gulp-ng-annotate';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import templateCache from 'gulp-angular-templatecache';
import inject from "gulp-inject";
import bowerFiles from 'main-bower-files';
import debug from 'gulp-debug';
import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';
import plumber from 'gulp-plumber';
import es from 'event-stream';
import babel from 'gulp-babel';
import wrap from "gulp-wrap-js";
import connect from 'gulp-connect';
import proxy from 'proxy-middleware';
import urlparser from 'url';
import cachebust from 'gulp-cache-bust';
import bower from 'gulp-bower';

let args = yargs.argv;
let env = args.env || 'prod';

const staticLocation = 'public/',
    appLocation = staticLocation + 'app/',
    bowerDependency = 'bower.json';

const angularAppLocation = appLocation + 'modules/**/*.js',
    lessLocation = appLocation + 'modules/**/*.less',
    lessMainLocation = appLocation + 'less/comment-formation.less',
    htmlLocation = appLocation + 'modules/**/*.html',
    indexLocation = staticLocation + 'index.html';

const cssDestionation = appLocation + 'css/',
    jsDestination = appLocation + 'js/';

const appName = 'comment-formation',
    appJsFileName = appName + '.js',
    appCssFileName = appName + '.css',
    appFiles = [cssDestionation + appCssFileName, jsDestination + appJsFileName];

let redirect = (route) => {
    return {
        to: function (remoteUrl) {
            var options = urlparser.parse(remoteUrl);
            options.route = route;
            options.preserveHost = true;
            return proxy(options);
        }
    }
};

// Lint Task
gulp.task('lint', () =>
        gulp.src(angularAppLocation)
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
);

gulp.task('js', () =>
        es.merge(
            gulp.src(htmlLocation).pipe(plumber()).pipe(templateCache('partial.js', {
                standalone: true,
                module: "cf.partial"
            })).pipe(concat("partials.js")),
            gulp.src(angularAppLocation)
        )
            .pipe(concat(appJsFileName))
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(wrap('(function() {%= body %})()'))
            .pipe(ngAnnotate())
            .pipe(gulp.dest(jsDestination))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(jsDestination))
            .pipe(connect.reload())
);

gulp.task('less', () =>
        gulp.src(lessLocation)
            .pipe(plumber())
            .pipe(less())
            .pipe(concat(appCssFileName))
            .pipe(gulp.dest(cssDestionation))
            .pipe(minifyCSS({keepBreaks: true}))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(cssDestionation))
            .pipe(connect.reload())
);

// Watch Files For Changes
gulp.task('watch', ['js', 'less', 'inject', 'webserver'], () => {
    gulp.watch(indexLocation, () => gulp.src(indexLocation).pipe(connect.reload()));
    gulp.watch([angularAppLocation, htmlLocation, indexLocation], ['js', 'lint']);
    gulp.watch(lessLocation, ['less']);
    gulp.watch(bowerDependency, ['inject']);
});

gulp.task('bower-install', () => bower());

gulp.task('inject', ['bower-install'], () => {

    const min = (env === 'dev') ? '' : '.min';

    gulp.src(indexLocation)
        .pipe(inject(gulp.src(bowerFiles({read: false, debugging: false, env: env})), {
            addRootSlash: false,
            ignorePath: "/bower_components/",
            addPrefix: 'app/lib'
        }))
        .pipe(inject(gulp.src(appFiles).pipe(rename({suffix : min})), {addRootSlash : false, ignorePath : "/public/", name: 'app'}))
        .pipe(cachebust({type: 'MD5'}))
        .pipe(gulp.dest(staticLocation))
        .pipe(connect.reload());

    gulp.src(bowerFiles({checkExistence: true, read: true, debugging: false, env: env}), {base: 'bower_components'})
        .pipe(gulp.dest(appLocation + 'lib'));
});

gulp.task('webserver', () => {
    let port = parseInt(args.port) || 8000;

    connect.server({
        root: staticLocation,
        port: port,
        livereload: true,
        fallback: indexLocation,
    });
});

// Default Task
gulp.task('default', ['bower-install', 'lint', 'less', 'js', 'inject']);
