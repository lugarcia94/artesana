const gulp = require("gulp"),
    browserSync = require("browser-sync").create("store"),
    proxyCheckout = require("browser-sync").create("checkout"),
    packageJSON = require("./package.json"),
    postcss = require("gulp-postcss"),
    stylus = require("gulp-stylus"),
    rename = require("gulp-rename");

const paths = {
    DIST: "dist",
    PROXY: "http://" + packageJSON.name + ".ecommercestore.com.br",
    PROXY2: "http://recursos." + packageJSON.name + ".ecommercestore.com.br/c",
    CSS: "src/styl"
};

let innerIp1 = "http://localhost:3000";
let innerIp2 = "http://localhost:4000";

gulp.task("browserSync", function() {
    browserSync.init({
        proxy: paths.PROXY,
        port: 3000,
        serveStatic: [
            {
                route: "/auaha.bundle.css",
                dir: "dist/auaha.bundle.css"
            },
            {
                route: "app.bundle.js",
                dir: "dist/app.bundle.js"
            }
        ],
        rewriteRules: [
            {
                match: new RegExp(paths.PROXY, "gi"),
                fn: function(req, res, match) {
                    return innerIp1;
                }
            },
            {
                match: new RegExp(paths.PROXY2, "gi"),
                fn: function(req, res, match) {
                    return innerIp1;
                }
            },
            {
                match: new RegExp(
                    "checkout." + packageJSON.name + ".ecommercestore.com.br",
                    "gi"
                ),
                fn: function(req, res, match) {
                    return innerIp2;
                }
            }
        ]
    });

    proxyCheckout.init({
        proxy: "checkout." + packageJSON.name + ".ecommercestore.com.br",
        port: 4000,
        open: false,
        ui: {
            port: 3002
        },
        serveStatic: [
            {
                route: "/auaha.bundle.css",
                dir: "dist/auaha.bundle.css"
            },
            {
                route: "app.bundle.js",
                dir: "dist/app.bundle.js"
            }
        ],
        rewriteRules: [
            {
                match: new RegExp(paths.PROXY, "gi"),
                fn: function(req, res, match) {
                    return innerIp1;
                }
            },
            {
                match: new RegExp(paths.PROXY2, "gi"),
                fn: function(req, res, match) {
                    return innerIp1;
                }
            },
            {
                match: new RegExp(
                    "checkout." + packageJSON.name + ".ecommercestore.com.br",
                    "gi"
                ),
                fn: function(req, res, match) {
                    return innerIp2;
                }
            }
        ]
    });
});

/**
 *  Stylus
 */
const vendorFiles = [
    //'node_modules/normalize.css/normalize.css'
    // 'node_modules/slick-carousel/slick/slick.css'
];

gulp.task("stylus", function() {
    return gulp
        .src(vendorFiles.concat([paths.CSS + "/core.styl"]))
        .pipe(
            stylus({
                linenos: true,
                compress: false
            }).on("error", function(err) {
                console.log(err);
                this.emit("end");
            })
        )
        .pipe(
            postcss([
                require("autoprefixer")({
                    browsers: ["last 2 versions"],
                    grid: true
                }),
                require("postcss-pxtorem")({
                    rootValue: 16,
                    unitPrecision: 2,
                    propList: [
                        "font",
                        "font-size",
                        "line-height",
                        "letter-spacing",
                        "width",
                        "height",
                        "margin",
                        "margin*",
                        "padding*",
                        "top",
                        "right",
                        "bottom",
                        "left"
                    ],
                    mediaQuery: false,
                    minPixelValue: 0,
                    replace: true
                }),
                require("postcss-inline-svg")(),
                require("postcss-svgo")()
            ])
        )
        .pipe(rename("auaha.bundle.css"))
        .pipe(gulp.dest(paths.DIST))
        .pipe(browserSync.stream());
});

gulp.task("watch", function() {
    gulp.watch("src/styl/**/*.styl", ["stylus"]);
    gulp.watch("dist/**/*.js").on("change", browserSync.reload);
});

gulp.task("default", ["stylus", "browserSync", "watch"]);
