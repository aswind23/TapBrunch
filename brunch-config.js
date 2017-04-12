module.exports = {
    // See http://brunch.io for documentation.
    files: {
        javascripts: {
            joinTo: {
                'js/vendor.js': /^(?!app)/, // Files that are not in `app` dir.
                'js/app.js': /^app/
            },
            order : {
                before : [                  
                    'app/js/app.js'
                ]
            }
        },
        stylesheets: {
            joinTo: 'css/app.css',
            order: {
                before : [
                    'app/css/main.css',
                    'app/css/responsive.css'
                ]
            }
        },
        templates: {
            joinTo: 'js/app.js'
        }
    },
    modules: {
        wrapper: false,
        definition: false
    },
    npm: {
        enabled: false
    }
}
