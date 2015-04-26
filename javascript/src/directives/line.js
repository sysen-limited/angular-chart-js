(function () {
    'use strict';

    function LineGraph(ChartJS) {
        return {
            restrict: 'CA',
            scope: {
                dataset: '=',
                options: '='
            },
            link: function (scope, elem) {
                var ctx;

                elem = angular.element(elem);
                ctx = elem[0].getContext("2d");

                new ChartJS(ctx).Line(scope.dataset, scope.options);
            }
        };
    }

    LineGraph.$inject = [
        'chartProvider'
    ];

    angular.module('sysChart').directive('sysChartLine', LineGraph);

})();