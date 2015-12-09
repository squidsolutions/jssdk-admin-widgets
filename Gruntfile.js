module.exports = function(grunt) {
    grunt
            .initConfig({
                jshint : {
                    all : [ 'src/*.js' ]
                },
                clean : {
                    all : "dist/"
                },
                bower_concat : {
                    all : {
                        dest : 'build/_bower.js',
                        exclude : [ 'squid_api', "jquery",
                                    "underscore",
                                    "backbone"],
                        bowerOptions : {
                            relative : false
                        }
                    }
                },
                concat : {
                    options : {
                        stripBanners : true,
                    },
                    js : {
                        src : [ 'build/templates.js',
                                'src/*.js' ],
                        dest : 'dist/squid_api_admin-widgets.js',
                    },
                    css : {
                        src : [ 'src/*.css' ],
                        dest : 'dist/squid_api_admin-widgets.css',
                    },
                    dev: {
                        files:{
                            'dist/squid_api_collection_management_widget.js': ['dist/squid_api_collection_management_widget_template.js', 'src/squid_api_collection_management_widget.js'],
                            'dist/squid_api_columns_management_widget.js': ['dist/squid_api_columns_management_widget_template.js', 'src/squid_api_columns_management_widget.js'],
                            'dist/squid_api_model_management_widget.js': ['dist/squid_api_model_management_widget_template.js', 'src/squid_api_model_management_widget.js'],
                            'dist/squid_api_project_management_widget.js': ['dist/squid_api_project_management_widget_template.js', 'src/squid_api_project_management_widget.js'],
                            'dist/squid_api_relation_management_widget.js': ['dist/squid_api_relation_management_widget_template.js', 'src/squid_api_relation_management_widget.js'],
                            'dist/squid_api_shortcuts_admin_widget.js': ['dist/squid_api_shortcuts_admin_widget_template.js', 'src/squid_api_shortcuts_admin_widget.js'],
                            'dist/squid_api_users_admin_widget.js': ['dist/squid_api_users_admin_widget_template.js', 'src/squid_api_users_admin_widget.js']
                        }
                    }
                },
                copy: {
                    devDist: {
                        files: [{
                            expand: true,
                            flatten: true,
                            src : [ 'src/*.js' ],
                            dest: 'dist'
                        }]
                    }
                },
                handlebars : {
                    options : {
                        namespace : 'squid_api.template',
                        processName : function(filePath) {
                            return filePath.replace(/^.*\//, '').replace(
                                    /\.hbs$/, '');
                        }
                    },
                    all : {
                        files : {
                            "build/templates.js" : [ "src/*.hbs" ]
                        }
                    },
                    dev : {
                        files : {
                            'dist/squid_api_collection_management_widget_template.js': ['src/squid_api_collection_management_widget.hbs'],
                            'dist/squid_api_columns_management_widget_template.js': ['src/squid_api_columns_management_widget.hbs'],
                            'dist/squid_api_model_management_widget_template.js': ['src/squid_api_model_management_widget.hbs'],
                            'dist/squid_api_project_management_widget_template.js': ['src/squid_api_project_management_widget.hbs'],
                            'dist/squid_api_relation_management_widget_template.js': ['src/squid_api_relation_management_widget.hbs'],
                            'dist/squid_api_shortcuts_admin_widget_template.js': ['src/squid_api_shortcuts_admin_widget.hbs'],
                            'dist/squid_api_users_admin_widget_template.js': ['src/squid_api_users_admin_widget.hbs']
                        }
                    }
                },
                watch : {
                    js : {
                        files : [ 'src/**/*.*' ],
                        tasks : [ 'default' ]
                    }
                }
            });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('devDist', [ 'jshint', 'clean', 'handlebars:dev', 'copy:devDist', 'concat:dev']);

    grunt.registerTask('default', [ 'jshint', 'clean', 'handlebars', 'concat:js', 'concat:css']);
};
