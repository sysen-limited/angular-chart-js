(function () {
    'use strict';

    angular.module('jekyll-angular', [])
        .config(function ($interpolateProvider) {
            $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
        });

})();
