/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.    
    pkg: grunt.file.readJSON('package.json'),
    distdir: 'dist',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>*/',
    clean: ['<%= distdir %>/*'],
    bower: {
      install: {     
        options: {
          cleanup: true
        }
      }
    },
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: ['radar.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= distdir %>/<%= pkg.name %>.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },      
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['radar.js', 'util.js']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    },    
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  // grunt.registerTask('default', ['bower', 'jshint', 'concat', 'uglify']);  
  grunt.registerTask('default', ['bower', 'concat', 'uglify']);

};
