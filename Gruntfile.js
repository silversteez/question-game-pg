module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        src: 'www/*',
        dest: 'test/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};