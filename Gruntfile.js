module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    stylus: {
      compile: {
        // options: {
        //   'paths': [
        //       // 'node_modules/',    // nib
        //       'styl/'             // Individual components
        //   ]
        // },
        files: {
          './css/styles.css': ['./styl/styles.styl']
        }
      }
    },
    copy: {
      main: {
        src: 'www/**',
        dest: '../question-game-be/',
      },
    },
    watch: {

    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['stylus', 'copy']);
  grunt.registerTask('justCopy', ['copy']);
};