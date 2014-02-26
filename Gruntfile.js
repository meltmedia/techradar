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

    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },      
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['scripts/*.js']
      }
    },

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'styles/app.css': 'styles/app.scss'
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: '*',
          port: 5555,
          base: '.'
        }
      }
    },
    
    mocha: {
      index: [ 'test/runner/index.html' ]
    },
    
    watch: {
      css: {
        files: ['**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      },
      scripts: {
        files: ['scripts/**/*.js'],
        tasks: ['jshint'],
        options: {
          spawn: false
        }
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-bower-task');

  // Default task.
  // grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('prepare', ['bower', 'jshint']);
  grunt.registerTask('test', ['bower', 'jshint', 'mocha']);
  grunt.registerTask('server', ['connect']);
  grunt.registerTask('run', ['sass', 'connect', 'watch']);

};
