angular.module('example', [])
    .service('serviceExample', function() {
        this.getWelcome = function() {
            return "Hello World!"
        };
    });
