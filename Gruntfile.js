module.exports=function(grunt){
 //here grunt code comes
 //project configuration
 grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      cssmin:{
            minify: {
            expand: true,
            cwd: 'public/css/',
            src: ['*.css', '!*.min.css'],
            dest: 'public/mincss/',
            ext: '.min.css'
                     }
            }
       });
//load grunt plugins and register tasks
grunt.loadNpmTasks("grunt-contrib-cssmin");
grunt.registerTask('default', ['cssmin']);