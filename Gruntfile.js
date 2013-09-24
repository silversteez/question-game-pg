module.exports = function(grunt) {

  grunt.initConfig({
    copy: {
      main: {
        src: 'www/**',
        dest: '../question-game-be/',
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);

};