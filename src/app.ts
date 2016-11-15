require.config({
    baseUrl: 'dist/libs',
    paths:{
        'materialize': 'materialize',
        'jquery': 'jquery'
    },
    shim: {
        'materialize': {
            deps: ['jquery'],
            exports: "$"
        }
    }
});

require(["app/main"]);