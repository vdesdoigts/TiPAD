module.exports = function(grunt) {
    grunt.initConfig({
        ltss: {
            compile: {
                files: [{
                    expand: true,
                    cwd: 'app/ltss',
                    src: ['**/*.ltss','!**/includes/**'],
                    dest: 'app/styles',
                    ext: '.tss'
                }]
            }
        },
        coffee: {
            options:{
                bare: true,
                sourceMap: false
            },
            compile: {
                files: [{
                    expand: true,
                    src: ["**/*.coffee"],
                    dest: "app/",
                    cwd: "app/coffee",
                    ext: ".js"
                }]
            }
        },

        // titanium-cli commands in absence of a plugin
        shell: {
            options: {
                stdout: true,
                stderr: true
            },
            iphone6: {
                command: "titanium build -p ios -S 6.1 -Y iphone"
            },
            iphone7: {
                command: "titanium build -p ios -S 7.1 -Y iphone"
            },
            ipad6: {
                command: "titanium build -p ios -S 6.1 -Y ipad"
            },
            ipad7: {
                command: "titanium build -p ios -S 7.1 -Y ipad"
            },
            icons: {
                command: "ticons icons"
            },
            splashes: {
                command: "ticons splashes --no-crop"
            },
            assets: {
                command: "ticons assets"
            }
        },
        watch: {
            options: {
                nospawn: false
            },
            all: {
                files: ["i18n/**","app/**/*.xml","app/**/*.ltss","app/coffee/**/*.coffee"],
                tasks: ['build']
            }
        },
        clean: {
            project: {
                src: [
                    "app/alloy.js",
                    "app/alloy.js.map",
                    "app/coffee/**/*.js",
                    "app/coffee/**/*.js.map",
                    "app/controllers/**/*.js",
                    "app/controllers/**/*.js.map",
                    "app/lib/**/*.js",
                    "app/lib/**/*.js.map",
                    "app/styles/**/*.tss",
                    "build/",
                    "Resources/"
                ]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    grunt.registerTask('default', 'build');
    grunt.registerTask('build', ['ltss', 'coffee']);

    // titanium cli tasks
    ['iphone6','iphone7','ipad6','ipad7','appstore','adhoc','playstore'].forEach(function(target) {
        grunt.registerTask(target, ['build','shell:'+target]);
    });

    // only modify changed file
    grunt.event.on('watch', function(action, filepath) {
        var o = {};
        if (filepath.match(/.ltss$/) && filepath.indexOf("includes") === -1){
            o[filepath.replace(".ltss",".tss")] = [filepath];
            grunt.config.set(['ltss', 'compile', 'files'],o);
        }
    });
};
